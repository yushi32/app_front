import { useState, useEffect } from "react"

export default function Card({ title }) {
  const [randomColor, setRandomColor] = useState();

  useEffect(() => {
    const colors = [
      'bg-red-300',
      'bg-blue-300',
      'bg-green-400',
      'bg-amber-200',
      'bg-purple-200',
      'bg-neutral-700',
      'bg-teal-200',
      'bg-pink-200',
      'bg-orange-300'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setRandomColor(colors[randomIndex]);
  }, []);

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
        <div className={`rounded-t-md ${randomColor} flex-1 h-[50%]`}>
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
