import axios from "axios";
import { useState, useEffect, useRef } from "react";

import { useAuthContext } from "../context/AuthContext";

export default function AddTag({ tags, setTags, bookmarkId }) {
  const [form, setForm] = useState(false);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef(null);
  const { currentUser } = useAuthContext();

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setForm(false);
    }
  };

  // フォームが表示された時にフォームにフォーカスを当てる
  useEffect(() => {
    if (form && formRef.current) {
      formRef.current.querySelector("input").focus();
    }
  }, [form]);

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (input !== '') {
      const newTag = { id: tags.length + 1, name: input };
      setTags([...tags, newTag]);
      setInput("");
      setForm(false);

      const token = await currentUser?.getIdToken();
      if (!token) {
        return
      } else {
        const config = {
          headers: { authorization: `Bearer ${token}` }
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookmarks/${bookmarkId}`,{ bookmark: { tag_name: input }},  config);
        console.log(res);
      }
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
