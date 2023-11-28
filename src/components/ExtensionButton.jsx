import Link from "next/link";

export default function ExtensionButton({ textSize='text-sm' }) {
  return (
    <Link
      href="https://chromewebstore.google.com/detail/laterless-extension/lhickbhpcfdhpljclokijligngkcdmij?hl=ja"
      className={`rounded-full text-center ${textSize} bg-emerald-400 p-2 hover:bg-emerald-200 hover:scale-95`}
    >
      <p>Chrome拡張機能を</p>
      <p>インストール</p>
    </Link>
  );
}