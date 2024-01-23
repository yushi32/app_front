import { useState } from "react";

export default function SearchForm() {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center justify-center rounded-full px-2 py-0.5 border ${isFocused ? "border-blue-400": ''}`}>
      <input
        placeholder="検索"
        value={input} 
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="focus:outline-none text-base w-80" />
    </form>
  );
}