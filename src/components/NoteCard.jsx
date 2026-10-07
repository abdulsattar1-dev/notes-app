import { Link } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function NoteCard({ note }) {
  const { togglePin } = useNotes();

  // Show a nice date like "7 Oct 2026"
  const date = new Date(note.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Show only the first 120 characters
  const preview =
    note.content.length > 120 ? note.content.slice(0, 120) + "..." : note.content;

  const handlePin = (e) => {
    e.preventDefault(); // don't open the note when clicking the pin
    togglePin(note.id);
  };

  return (
    <Link to={`/note/${note.id}`} className={`note-card cat-${note.category.toLowerCase()}`}>
      <div className="card-top">
        <span className="badge">{note.category}</span>
        <button
          className={`pin-btn ${note.pinned ? "pinned" : ""}`}
          onClick={handlePin}
          title={note.pinned ? "Unpin" : "Pin"}
        >
          📌
        </button>
      </div>

      <h3>{note.title}</h3>
      <p className="preview">{preview}</p>
      <span className="date">{date}</span>
    </Link>
  );
}

export default NoteCard;