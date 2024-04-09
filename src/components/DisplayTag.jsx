export default function DisplayTag({ name }) {
  return (
    <div
      className="rounded-full text-xs whitespace-nowrap px-2 py-1 bg-emerald-200 border border-emerald-200"
    >
      #{name}
    </div>
  );
}
