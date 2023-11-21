export default function Tag({ name }) {
  return (
    <button className="rounded-full bg-emerald-200 text-xs px-2 py-1 hover:bg-emerald-400 hover:scale-95">
      #{name}
    </button>
  );
}