'use client'

export default function SignOutButton({ logout }) {
  return (
    <button onClick={logout} className="p-3 mx-2 my-6 rounded-full bg-emerald-400 hover:bg-emerald-300 hover:scale-95">
      ログアウト
    </button>
  );
}