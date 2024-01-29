import { useState } from "react";

import { AutoComplete } from 'primereact/autocomplete';

import { useFetchSelectableTags } from "../hooks/useFetchSelectableTags";
import { useBookmark } from "../hooks/useBookmark";
import { useToggleForm } from "../hooks/useToggleForm";

const pt = {
  input: {
    root: {
      className: "border-none p-0.5 focus:outline-none focus:shadow-none text-xs w-28"
    }
  },
  dropdownButton: {
    root: {
      className: "w-8 h-6 p-0 bg-blue-400 border-blue-400 hover:bg-blue-500 hover:border-blue-500"
    }
  },
  panel : {
    className: "m-1"
  },
  list : {
    className: "py-2"
  },
  item: {
    className: "flex flex-col justify-center h-7 py-1 px-2 text-xs"
  },
};

export default function AddTag({ tags, setTags, bookmarkId }) {
  const { selectableTags } = useFetchSelectableTags();
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
  const [suggestions, setSuggestions] = useState([]);

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

  const search = (e) => {
    const inputValue = e.query.toLowerCase();
    const matchingTags = selectableTags.filter(tag =>
      tag.name.toLowerCase().includes(inputValue)
    );
    setSuggestions(matchingTags.map(tag => tag.name));
  };

  return (
    <>
      {form ? (
        <form
          onSubmit={handleOnSubmit}
          ref={formRef}
          className={`flex items-center justify-center rounded-full border pl-1.5 ${isFocused ? "border-blue-400" : ""}`}
        >
          <AutoComplete
            value={input}
            suggestions={suggestions}
            completeMethod={search}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            pt={pt}
            dropdown
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
