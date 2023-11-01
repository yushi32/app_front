import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-emerald-400 text-white">
      <div className="flex justify-between items-center max-w-5xl mx-auto h-16">
        <div>コピーライト</div>
        <div>
          <Link href="/" className="mx-2">利用規約</Link>
          <Link href="/" className="mx-2">プライバシーポリシー</Link>
          <Link href="/" className="mx-2">お問い合わせ</Link>
        </div>
      </div>
    </div> 
  )
}