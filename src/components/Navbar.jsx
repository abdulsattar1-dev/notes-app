import { Link, NavLink } from "react-router-dom";
import { useNotes } from "../context/NotesContext";

function Navbar({ theme, toggleTheme }) {
  const { notes } = useNotes();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          📚 SkillNotes
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            My Notes ({notes.length})
          </NavLink>
          <NavLink to="/new" className="btn-new">
            + New Note
          </NavLink>
          <button className="theme-btn" onClick={toggleTheme} title="Change theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;