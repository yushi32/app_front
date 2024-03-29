import { useState, useEffect, useRef } from "react";

export function useToggleForm(clearInput=true) {
  const [form, setForm] = useState(false);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef(null);

  const openForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
    setInput('');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('p-autocomplete-item')) {
      return;
    }

    if (formRef.current && !formRef.current.contains(event.target)) {
      setForm(false);
      if (clearInput) {
        setInput('');
      }
    }
  };

  // フォームが表示された時にフォームにフォーカスする
  useEffect(() => {
    if (form && formRef.current) {
      formRef.current.querySelector("input").focus();
    }
  }, [form]);

  // フォーム以外の部分がクリックされた時にフォームを非表示にする
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
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
  };
}