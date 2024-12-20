import { useRef, useEffect, useState } from 'react'
import Trash from '../icons/Trash'
import { setNewOffset } from '../utils/setNewOffset';
import { autoGrow } from '../utils/autoGrow';
import { setZIndex } from '../utils/setZIndex';

const NoteCard = ({ note }) => {
    const [position, setPositon] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors)
    const body = JSON.parse(note.body)

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null)

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const mouseDown = (e) => {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
    
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);

        setZIndex(cardRef.current);
    };

    const mouseMove = (e) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };
    
        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    
        //3 - Update card top and left position.
        setPositon(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

    return (
        <div 
            ref={cardRef}
            className='card' 
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div 
                onMouseDown={mouseDown}
                className="card-header" 
                style={{backgroundColor: colors.colorHeader}}
            >
                <Trash/>
            </div>

            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    defaultValue={body}
                    style={{color: colors.colorText}}
                    onInput={() => autoGrow(textAreaRef)}
                    onFocus={() => setZIndex(cardRef.current)}                   
                 >

                </textarea>
            </div>
        </div>
    )
}

export default NoteCard