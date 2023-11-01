import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full bg-white border-b-2">
      <div className="flex justify-between items-center h-16 max-w-5xl mx-auto">
        <nav className="bg-emerald-400 p-3">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={24} height={24} />
            <h2 className="text-lg">Laterless</h2>
          </Link>
        </nav>
        <button className="bg-emerald-400 p-2 m-2 rounded-full">ログイン</button>
      </div>
    </div>   
  )
}