import { useState } from "react";

export default function AddTag() {
  const [form, setForm] = useState(false);

  const openForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
  };

  return (
    <>
      {form ? (
        <>
          <form className="flex items-center justify-center rounded-full border pl-1">
            <input className="focus:outline-none text-xs w-20" />
            <button onClick={closeForm} className="rounded-full bg-emerald-200 text-xs px-2 py-1 hover:bg-emerald-400 hover:scale-95">
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
