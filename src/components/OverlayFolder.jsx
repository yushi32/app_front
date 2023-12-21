import Image from "next/image";

export default function OverlayFolder({ name }) {
  return (
    <div className="flex items-center justify-center z-10 opacity-50 border border-gray-400 rounded-md">
      <Image
        src="/draggable.svg"
        alt="draggable"
        width={20}
        height={20}
      />
      <button className="flex-1 text-left text-sm font-medium h-full py-2.5">
        {name}
      </button>
    </div>
  );
}