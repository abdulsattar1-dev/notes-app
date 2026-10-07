import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotes, CATEGORIES } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

function Home() {
  const { notes } = useNotes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const text = search.trim().toLowerCase();

  // 1. Filter by search text and category
  const filtered = notes.filter((note) => {
    const matchText =
      note.title.toLowerCase().includes(text) ||
      note.content.toLowerCase().includes(text);
    const matchCategory = category === "All" || note.category === category;
    return matchText && matchCategory;
  });

  // 2. Sort: pinned notes first, then by the chosen order
  const sorted = [...filtered].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (sortBy === "newest") return b.updatedAt - a.updatedAt;
    if (sortBy === "oldest") return a.updatedAt - b.updatedAt;
    return a.title.localeCompare(b.title); // A → Z
  });

  // How many notes in each category
  const countFor = (cat) =>
    cat === "All" ? notes.length : notes.filter((n) => n.category === cat).length;

  return (
    <div className="page">
      <header className="home-header">
        <h1>My Skill Notes ✍️</h1>
        <p>Save what you learn every day.</p>
      </header>

      <div className="toolbar">
        <input
          className="search"
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A → Z</option>
        </select>
      </div>

      <div className="chips">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            className={`chip ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat} <span>{countFor(cat)}</span>
          </button>
        ))}
      </div>

      {notes.length === 0 ? (
        <div className="empty">
          <p>📝 You have no notes yet.</p>
          <Link to="/new" className="btn-primary">
            Write your first note
          </Link>
        </div>
      ) : sorted.length === 0 ? (
        <div className="empty">
          <p>😕 No notes found.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {sorted.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;