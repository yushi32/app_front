import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full h-16 bg-emerald-400 text-white">
      <div className="flex justify-between items-center max-w-5xl mx-auto h-full">
        <div className="text-sm">
          © 2023 All rights reserved.
        </div>
        <nav>
          <Link href="/" className="mx-2">利用規約</Link>
          <Link href="/" className="mx-2">プライバシーポリシー</Link>
          <Link href="/" className="mx-2">お問い合わせ</Link>
        </nav>
      </div>
    </footer> 
  )
}