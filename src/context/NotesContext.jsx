import { createContext, useContext, useReducer, useEffect } from "react";

const NotesContext = createContext();

export const CATEGORIES = ["React", "JavaScript", "CSS", "English", "Other"];

// Some example notes for the first visit
const sampleNotes = [
  {
    id: 1,
    title: "What is useState?",
    content:
      "useState lets a component remember a value.\nWhen the value changes, React updates the screen.\n\nconst [count, setCount] = useState(0);",
    category: "React",
    pinned: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    title: "map() vs filter()",
    content:
      "map() changes every item and returns a new array.\nfilter() keeps only the items that pass a test.",
    category: "JavaScript",
    pinned: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    title: "New English words",
    content:
      "debounce = wait a little before doing something\nreusable = can be used again\ndependency = something that another thing needs",
    category: "English",
    pinned: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

// The REDUCER: it gets an action and returns the new list of notes
function notesReducer(notes, action) {
  switch (action.type) {
    case "ADD":
      return [action.note, ...notes];

    case "UPDATE":
      return notes.map((note) =>
        note.id === action.note.id
          ? { ...note, ...action.note, updatedAt: Date.now() }
          : note
      );

    case "DELETE":
      return notes.filter((note) => note.id !== action.id);

    case "TOGGLE_PIN":
      return notes.map((note) =>
        note.id === action.id ? { ...note, pinned: !note.pinned } : note
      );

    default:
      return notes;
  }
}

// Load notes from localStorage (only once, at the start)
function loadNotes() {
  try {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : sampleNotes;
  } catch {
    return sampleNotes;
  }
}

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, null, loadNotes);

  // Save notes every time they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (data) => {
    const now = Date.now();
    const newNote = { id: now, ...data, pinned: false, createdAt: now, updatedAt: now };
    dispatch({ type: "ADD", note: newNote });
    return newNote.id;
  };

  const updateNote = (id, data) => dispatch({ type: "UPDATE", note: { id, ...data } });
  const deleteNote = (id) => dispatch({ type: "DELETE", id });
  const togglePin = (id) => dispatch({ type: "TOGGLE_PIN", id });
  const getNote = (id) => notes.find((note) => note.id === Number(id));

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, togglePin, getNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}