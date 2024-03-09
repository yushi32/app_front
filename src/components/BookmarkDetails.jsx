export default function BookmarkDetails({ id, title, url, thumbnail, tags, folder_id }) {

  return (
    <div className="w-[600px] h-[600px] px-12 pt-6 bg-red-200">
      <p>ブックマーク詳細モーダルだよ</p>
      <p>id: {id}</p>
      <p>title: {title}</p>
      <p>url: {url}</p>
      <p>tag:
        {tags.length > 0 &&
          tags.map((tag) => <span>{tag.name} </span>)
        }
      </p>
      <p>folder_id: {folder_id}</p>
    </div>
  );
}