import Link from "next/link";

export default function LineLinkButton({ textSize='text-sm' }) {
  return (
    <Link
      href="/line_connect"
      className={`rounded-full text-center ${textSize} bg-emerald-400 p-2 hover:bg-emerald-200 hover:scale-95`}
    >
      <p>LINEアカウント</p>
      <p>連携</p>
    </Link>
  );
}