import { useState, useEffect } from "react";

// Our own custom hook!
// It works like useState, but it also REMEMBERS the value in localStorage.
function useLocalStorage(key, startValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : startValue;
    } catch {
      return startValue;
    }
  });

  // Every time the value changes, save it
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;