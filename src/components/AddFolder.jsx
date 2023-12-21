import { useToggleForm } from "../hooks/useToggleForm";
import { useFolder } from "../hooks/useFolder";

export default function AddFolder() {
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
  const { createFolder } = useFolder();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (input !== '') {
      await createFolder(input);
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
            className="focus:outline-none text-sm w-32"
          />
          <button
            type="button"
            onClick={closeForm}
            className="rounded-full bg-emerald-200 text-lg px-2.5 border-transparent hover:scale-95 hover:bg-emerald-400 hover:border-emerald-400"
          >
            -
          </button>
        </form>
      ) : (
        <button
          onClick={openForm}
          className="rounded-full bg-emerald-200 text-lg px-2 hover:scale-90 hover:bg-emerald-400 hover:border hover:border-emerald-400"
        >
          +
        </button>
      )}
    </>
  );
}
