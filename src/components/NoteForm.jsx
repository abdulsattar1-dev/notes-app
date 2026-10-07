import { useState } from "react";
import { CATEGORIES } from "../context/NotesContext";

// This ONE form is used for "New Note" AND "Edit Note"
function NoteForm({ startValues, onSave, buttonText }) {
  const [title, setTitle] = useState(startValues?.title || "");
  const [content, setContent] = useState(startValues?.content || "");
  const [category, setCategory] = useState(startValues?.category || CATEGORIES[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      setError("Please write a title and some content.");
      return;
    }

    onSave({ title: title.trim(), content: content.trim(), category });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. What is useEffect?"
          maxLength={80}
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label>
        Content
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write what you learned today..."
        />
      </label>

      <span className="char-count">{content.length} characters</span>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

export default NoteForm;