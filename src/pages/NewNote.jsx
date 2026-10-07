import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import NoteForm from "../components/NoteForm";

function NewNote() {
  const { addNote } = useNotes();
  const navigate = useNavigate();

  const handleSave = (data) => {
    const id = addNote(data);
    navigate(`/note/${id}`); // open the new note
  };

  return (
    <div className="page narrow">
      <h1 className="page-title">New Note ✏️</h1>
      <NoteForm onSave={handleSave} buttonText="Save Note" />
    </div>
  );
}

export default NewNote;