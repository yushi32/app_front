import { useState, useEffect, useRef } from "react";

import { useBookmark } from "../hooks/useBookmark";
import { useToggleForm } from "../hooks/useToggleForm";

export default function AddTag({ tags, setTags, bookmarkId }) {
  const [input, setInput] = useState('');
  const { addTagToBookmark } = useBookmark();
  const {
    form,
    isFocused,
    formRef,
    setForm,
    openForm,
    closeForm,
    handleFocus,
    handleBlur
  } = useToggleForm();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (input !== '') {
      const newTags = await addTagToBookmark(bookmarkId, input);
      setTags(newTags);
      setInput('');
      setForm(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
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
