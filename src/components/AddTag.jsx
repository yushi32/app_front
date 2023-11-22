import { useState, useEffect, useRef } from "react";

export default function AddTag({ tags, setTags }) {
  const [form, setForm] = useState(false);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input !== '') {
      const newTag = { id: tags.length + 1, name: input };
      setTags([...tags, newTag]);
      setInput("");
      setForm(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      {form ? (
        <form
          onSubmit={handleOnSubmit}
          ref={formRef}
          className={`flex items-center justify-center rounded-full border pl-1 ${isFocused ? "border-blue-400" : ""}`}
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="focus:outline-none text-xs w-20"
          />
          <button
            type="button"
            onClick={closeForm}
            className="rounded-full bg-emerald-200 text-xs px-2 py-1 hover:bg-emerald-400 hover:scale-95"
          >
            -
          </button>
        </form>
      ) : (
        <button
          onClick={openForm}
          className="rounded-full bg-emerald-200 text-xs px-2 py-1 hover:bg-emerald-400 hover:scale-95 border border-emerald-200 hover:border-emerald-400"
        >
          +
        </button>
      )}
    </>
  );
}
