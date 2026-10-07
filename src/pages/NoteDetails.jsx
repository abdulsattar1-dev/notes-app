import { useParams, useNavigate, Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function NoteDetails() {
  const { id } = useParams();
  const { getNote, deleteNote, togglePin } = useNotes();
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

  const formatDate = (time) =>
    new Date(time).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleDelete = () => {
    if (window.confirm("Delete this note? This cannot be undone.")) {
      deleteNote(note.id);
      navigate("/");
    }
  };

  const wasEdited = note.updatedAt - note.createdAt > 1000;

  return (
    <div className="page narrow">
      <Link to="/" className="btn-back">
        ← All notes
      </Link>

      <article className={`note-details cat-${note.category.toLowerCase()}`}>
        <div className="card-top">
          <span className="badge">{note.category}</span>
          {note.pinned && <span className="pinned-label">📌 Pinned</span>}
        </div>

        <h1>{note.title}</h1>

        <p className="dates">
          Created: {formatDate(note.createdAt)}
          {wasEdited && <> · Updated: {formatDate(note.updatedAt)}</>}
        </p>

        <div className="content">{note.content}</div>

        <div className="actions">
          <Link to={`/edit/${note.id}`} className="btn-primary">
            ✏️ Edit
          </Link>
          <button className="btn-secondary" onClick={() => togglePin(note.id)}>
            {note.pinned ? "Unpin" : "📌 Pin"}
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            🗑️ Delete
          </button>
        </div>
      </article>
    </div>
  );
}

export default NoteDetails;