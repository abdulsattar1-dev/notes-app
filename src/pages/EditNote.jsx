import { useParams, useNavigate, Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import NoteForm from "../components/NoteForm";

function EditNote() {
  const { id } = useParams();
  const { getNote, updateNote } = useNotes();
  const navigate = useNavigate();

  const note = getNote(id);

  if (!note) {
    return (
      <div className="page narrow empty">
        <p>😕 Note not found.</p>
        <Link to="/" className="btn-primary">
          Back to notes
        </Link>
      </div>
    );
  }

  const handleSave = (data) => {
    updateNote(note.id, data);
    navigate(`/note/${note.id}`);
  };

  return (
    <div className="page narrow">
      <h1 className="page-title">Edit Note 📝</h1>
      <NoteForm startValues={note} onSave={handleSave} buttonText="Update Note" />
    </div>
  );
}

export default EditNote;