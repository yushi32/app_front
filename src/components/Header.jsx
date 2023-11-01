import Image from "next/image";

export default function Header() {
  return (
    <nav className="w-full bg-white border-b-2">
      <div className="flex justify-between items-center h-16 max-w-5xl mx-auto">
        <div className="flex items-center bg-emerald-400 p-3">
          <Image src="/logo.svg" alt="Logo" width={24} height={24} />
          <h2 className="text-lg">Laterless</h2>
        </div>
        <button className="bg-emerald-400 p-2 m-2 rounded-full">ログイン</button>
      </div>
    </nav>   
  )
}