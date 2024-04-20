import Image from "next/image";

export default function DisplayTag({ name, setSubmitTags }) {
  const handleOnClickRemoveButton = () => {
    setSubmitTags((prevTags) => {
      return prevTags.filter((tag) => tag.name !== name);
    });
  };

  return (
    <div
      className="flex items-center rounded-full text-xs whitespace-nowrap px-2 py-1 bg-emerald-200 border border-emerald-200"
    >
      #{name}
      <button
        type="button"
        onClick={handleOnClickRemoveButton}
        className="flex-shrink-0 pl-1 pr-2"
      >
        <Image 
          src="/remove.svg"
          alt="remove"
          width={8}
          height={8}
        />
      </button>
    </div>
  );
}
