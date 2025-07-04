import { useEffect, useState } from "react";
import { SongList } from "./components/SongList";
import spotify from "./lib/spotify";
import { SearchInput } from "./components/searchInput";
import { Pagination } from "./components/pagination";
import { AlbumList } from "./components/AlbumList";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [album, setGetAlbum] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchedSongs, setSearchedSongs] = useState();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const isSearchedResult = searchedSongs != null;
  const limit = 20;

  // コンポーネントがマウントされたときに人気の曲を取得する
  useEffect(() => {
    fetchPopularSongs();
    fetchAlbum();

  }, []);

  // 人気の曲を取得する関数
  const fetchPopularSongs = async () => {
    setIsLoading(true);
    const result = await spotify.getPopularSongs();

    const popularSongs = result.items.map((item) => {
      return item.track;
    })
    // console.log(popularSongs);
    setPopularSongs(popularSongs);
    setIsLoading(false);
  }

  // おすすめプレイリストを取得する関数
  const fetchAlbum = async () => {
    setIsLoading(true);
    const result = await spotify.getAlbum();
    console.log(result);

    // setGetAlbum(result);
    setGetAlbum([result]);
    setIsLoading(false);
  }
  // 検索キーワードの変更をハンドルする関数
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }

  // 検索ボタンがクリックされたときの処理
  const searchSongs = async (page) => {
    setIsLoading(true);
    const offset = parseInt(page) ? (parseInt(page) - 1) * limit : 0;
    const result = await spotify.searchSongs(keyword, limit, offset);
    setHasNext(result.next != null);
    setHasPrev(result.previous != null);
    setSearchedSongs(result.items);
    setIsLoading(false);
  }

  // Nextのボタンがクリックされたときの処理
  const moveToNext = async () => {
    const nextPage = page + 1;
    await searchSongs(nextPage);
    setPage(nextPage);
  }

  // Prevのボタンがクリックされたときの処理
  const moveToPrev = async () => {
    const prevPage = page - 1;
    await searchSongs(
      prevPage);
    setPage(prevPage);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />

        <section>
          <h2 className="text-2xl font-semibold mb-5">{isSearchedResult ? "Search Results" : "Popular Songs"}</h2>
          <SongList isLoading={isLoading} songs={isSearchedResult ? searchedSongs : popularSongs} />

          <h2 className="text-2xl font-semibold mb-5">{isSearchedResult ? "Search Results" : "Album"}</h2>
          <AlbumList isLoading={isLoading} albums={isSearchedResult ? searchedSongs : album} />

          {isSearchedResult &&
            <Pagination
              onPrev={hasPrev ? moveToPrev : null}
              onNext={hasNext ? moveToNext : null}
            />}
        </section>
      </main>
    </div>
  );
}

export default App;
