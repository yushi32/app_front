export default function Card({ title, overlayColor }) {
  return (
    <div
      className="
        col-span-1
        rounded-md
        shadow-md
        mx-1
        h-1/2
        w-3/5
        flex
        flex-col
        border-6
        bg-white
        opacity-80"
    >
      <div
        className="flex flex-col h-full"
      >
        <div className={`rounded-t-md ${overlayColor} flex-1 h-[50%]`}>
        </div>
        <div
          className="
            px-1
            py-1
            text-center
            text-xs
            h-[50%]
            overflow-hidden
          "
        >
          {title}
        </div>
      </div>
    </div>
  );  
}
