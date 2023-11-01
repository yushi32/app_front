export default function Header() {
  return (
    <nav className="w-full bg-white border-b-2">
      <div className="flex justify-between items-center h-16 max-w-5xl mx-auto">
        <div className="bg-emerald-400 p-2">Logo</div>
        <button className="bg-emerald-400 p-2 m-2 rounded-full">ログイン</button>
      </div>
    </nav>   
  )
}