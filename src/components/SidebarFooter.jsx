import Link from "next/link";

export default function SidebarFooter() {
  return(
    <div className="flex flex-wrap pt-12 mt-auto text-xs text-slate-400">
      <Link href="/home" className="p-2 hover:text-emerald-300">Laterlessについて</Link>
      <Link href="/home" className="p-2 hover:text-emerald-300">利用規約</Link>
      <Link href="/privacy_policy" className="p-2 hover:text-emerald-300">プライバシーポリシー</Link>
      <Link href="/home" className="p-2 hover:text-emerald-300">お問い合わせ</Link>
      <p className="p-2">© 2023 All rights reserved.</p>
    </div>
  );
}