import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { toast } from "sonner";
 
const DeleteButton = ({ noteId }) => {
    const { setNotes } = useContext(NoteContext);
 
    const handleDelete = async (e) => {
        db.notes.delete(noteId);
        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );
        toast.success('DELETE!', {
            description: 'Note deleted successfully',
        })
    };
 
    return (
        <div className="trash-btn" onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;