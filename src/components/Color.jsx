import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";
import { toast } from "sonner";

const Color = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NoteContext);

    const changeColor = () => {
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );
    
            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };
    
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);
    
            db.notes.update(selectedNote.$id, {
                colors: JSON.stringify(color),
            });
        } catch (error) {
            console.error("Error changing color:", error);
            toast.error('Ohh No!', {
                description: 'You must select a note before changing colors',
            })
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;