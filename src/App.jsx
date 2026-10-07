import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";
import NoteDetails from "./pages/NoteDetails";
import "./App.css";

function NotFound() {
  return (
    <div className="page narrow empty">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <Link to="/" className="btn-primary">
        Go home
      </Link>
    </div>
  );
}

function App() {
  // Our custom hook! The theme is remembered after refresh.
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <NotesProvider>
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewNote />} />
            <Route path="/note/:id" element={<NoteDetails />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="footer">Made with React by Abdul Sattar 💚</footer>
      </BrowserRouter>
    </NotesProvider>
  );
}

export default App;