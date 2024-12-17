import React from 'react'
import Trash from '../icons/Trash'

const NoteCard = ({ note }) => {
    const position = JSON.parse(note.position)
    const colors = JSON.parse(note.colors)
    const body = JSON.parse(note.body)
    
    function autoGrow(textAreaRef) {
        const { current } = textAreaRef;
        current.style.height = "auto"; 
        current.style.height = current.scrollHeight + "px"; 
    }

    return (
        <div className='card' 
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="card-header" style={{backgroundColor: colors.colorHeader}}>
                <Trash/>
            </div>

            <div className="card-body">
                <textarea
                    defaultValue={body}
                    style={{color: colors.colorText}}
                 >

                </textarea>
            </div>
        </div>
    )
}

export default NoteCard