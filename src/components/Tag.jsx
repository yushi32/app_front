import { useSearchContext } from "../context/SearchContext";

export default function Tag({ name }) {
  const { selectedTags, handleFilteringByTag } = useSearchContext();

  const handleOnClick = () => {
    handleFilteringByTag(name);
  };

  return (
    <button
      onClick={handleOnClick}
      className={
        `rounded-full
        bg-emerald-200
        text-xs
        whitespace-nowrap
        px-2
        py-1
        hover:bg-emerald-400
        hover:scale-95
        border
        border-emerald-200
        hover:border-emerald-400
        ${selectedTags.includes(name) ? 'bg-emerald-400 border-emerald-400' : ''}`
      }
    >
      #{name}
    </button>
  );
}
