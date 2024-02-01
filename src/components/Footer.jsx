import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full h-16 bg-emerald-400 text-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto h-full">
        <div className="text-sm">
          © 2023 All rights reserved.
        </div>
        <nav className="space-x-6">
          <Link href="/terms_of_service">利用規約</Link>
          <Link href="/privacy_policy">プライバシーポリシー</Link>
          <Link href="/">お問い合わせ</Link>
        </nav>
      </div>
    </footer> 
  )
}
