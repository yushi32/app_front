import { useState, useRef } from "react";
import Image from "next/image";

import { useSearchContext }from "../context/SearchContext";

export default function SearchForm() {
  const { setSearchKeyword } = useSearchContext();
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== '') {
      setSearchKeyword(input);
      inputRef.current.blur();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const clearInput = (e) => {
    e.preventDefault();
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-80 rounded-full px-2 py-0.5 border ${isFocused ? "border-blue-400": ''}`}
    >
      <div className="flex items-center justify-center">
        <input
          placeholder="検索"
          ref={inputRef}
          value={input} 
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full focus:outline-none text-base"
        />
        {input && (
          <button
            type="button"
            onMouseDown={clearInput}
          >
            <Image 
              src="/cross.svg"
              alt="clear"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </form>
  );
}