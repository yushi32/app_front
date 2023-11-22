import { useState } from "react";

export default function AddTag({ tags, setTags }) {
  const [form, setForm] = useState(false);
  const [input, setInput] = useState('');

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

  return (
    <>
      {form ? (
        <>
          <form
            onSubmit={handleOnSubmit}
            className="flex items-center justify-center rounded-full border pl-1"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
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
        </>
      ) : (
        <button onClick={openForm} className="rounded-full bg-emerald-200 text-xs px-2 py-1 hover:bg-emerald-400 hover:scale-95 border border-emerald-200 hover:border-emerald-400">
          +
        </button>
      )}
    </>
  );
}
