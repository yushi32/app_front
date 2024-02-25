export default function Card({ title, thumbnail, overlayColor }) {
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
        {thumbnail ? 
          <img
            alt="Article thumbnail"
            src={thumbnail}
            className="rounded-t-md mx-auto w-full aspect-[1/0.525]"
          />
        :
          <div className={`rounded-t-md ${overlayColor} w-full aspect-[1/0.525]`}></div>
        }
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
