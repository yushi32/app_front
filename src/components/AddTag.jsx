import { useState } from "react";

import { AutoComplete } from 'primereact/autocomplete';

import { useBookmark } from "../hooks/useBookmark";
import { useToggleForm } from "../hooks/useToggleForm";

const userTags = [
  {id: 1, name: 'React'},
  {id: 2, name: 'Chrome拡張機能'},
  {id: 3, name: 'Docker'},
  {id: 4, name: 'Next.js'},
  {id: 5, name: 'あいうえお'},
];

export default function AddTag({ tags, setTags, bookmarkId }) {
  const { addTagToBookmark } = useBookmark();
  const {
    form,
    input,
    isFocused,
    formRef,
    setForm,
    setInput,
    openForm,
    closeForm,
    handleFocus,
    handleBlur
  } = useToggleForm();
  const [items, setItems] = useState([]);

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

  const search = (event) => {
    console.log(event.query)
    const inputValue = event.query.toLowerCase();
    console.log(`inputValue: ${inputValue}`)
    const matchingTags = userTags.filter(tag =>
      tag.name.toLowerCase().includes(inputValue)
    );
    console.log(matchingTags)
    setItems(matchingTags.map(tag => tag.name));
  };

  return (
    <>
      {form ? (
        <form
          onSubmit={handleOnSubmit}
          ref={formRef}
          className={`flex items-center justify-center rounded-full border pl-1 ${isFocused ? "border-blue-400" : ""}`}
        >
          <AutoComplete
            value={input}
            suggestions={items}
            completeMethod={search}
            onChange={handleInputChange}
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
