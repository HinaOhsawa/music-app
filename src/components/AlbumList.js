import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AlbumList(props) {
  if (props.isLoading)
    return (
      <div className="inset-0 flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {props.albums.map((album) => {
        console.log(album);
        return (
          <a
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none cursor-pointer"
            key={album.id}
          >
            <img
              alt="thumbnail"
              src={album?.images?.[0]?.url}
              className="mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{album?.name}</h3>
            <p className="text-gray-400">By {album?.artists?.[0]?.name}</p>
          </a>
        );
      })}
    </div>
  );
}