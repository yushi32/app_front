import Link from "next/link";

export default function Card({ url, title }) {
  return (
    <div className="col-span-1 text-center rounded shadow-md bg-yellow-200 mt-4 mx-1 max-h-72 p-3">
      <Link href={url}>
        {title}
      </Link>
    </div>
  );
}