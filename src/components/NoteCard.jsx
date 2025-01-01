import { useRef, useEffect, useState, useContext } from 'react'
import { setNewOffset } from '../utils/setNewOffset';
import { autoGrow } from '../utils/autoGrow';
import { setZIndex } from '../utils/setZIndex';
import { bodyParser } from '../utils/bodyParser';
import { db } from "../appwrite/databases";
import Spinner from '../icons/Spinner';
import DeleteButton from './DeleteButton';
import { NoteContext } from '../context/NoteContext';
import formatDate from '../utils/formatDate';

const NoteCard = ({ note }) => {
    const { setSelectedNote } = useContext(NoteContext);
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const [position, setPositon] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors)
    const body = bodyParser(note.body);
    const [displayDate, setDisplayDate] = useState(note.updated_at || note.$createdAt);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null)

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, []);

    useEffect(() => {
        setDisplayDate(note.updated_at || note.$createdAt);
    }, [note.updated_at, note.$createdAt]);

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
        
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            setZIndex(cardRef.current);
            setSelectedNote(note);
        }
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
         
        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    const saveData = async (key, value) => {
        setSaving(true); 
        const newUpdatedAt = new Date().toISOString();

        const payload = {
            [key]: JSON.stringify(value), 
            updated_at: newUpdatedAt,
        };

        try {
            await db.notes.update(note.$id, payload);
            setDisplayDate(newUpdatedAt); 
        } catch (error) {
            console.error("Error saving data:", error);
        }
        setSaving(false);

    };

    const handleKeyUp = async () => {
        //1 - Initiate "saving" state
        setSaving(true);
    
        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
    
        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
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
                <DeleteButton noteId={note.$id}/>

                {saving ? (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText, fontSize: "12px" }}>
                            Saving...
                        </span>
                    </div>
                ) : (
                    <p>{formatDate(displayDate)}</p>
                )}
            </div>

            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    defaultValue={body}
                    style={{color: colors.colorText}}
                    onInput={() => autoGrow(textAreaRef)}
                    onFocus={() => {
                        setZIndex(cardRef.current)
                        setSelectedNote(note);
                    }}
                    onKeyUp={handleKeyUp}                   
                 >

                </textarea>
            </div>
        </div>
    )
}

export default NoteCard