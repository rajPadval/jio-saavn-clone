import { useSelector } from "react-redux";
import AlbumItem from "./AlbumItem";
import Slider from "./Slider";
import { useMemo } from "react";

const MainSection = () => {
  const albums = useSelector((state) => state.homePageSlice.albums);
  const playlists = useSelector((state) => state.homePageSlice.playlists);
  const charts = useSelector((state) => state.homePageSlice.charts);
  const trending = useSelector((state) => state.homePageSlice.trending);


  const trendingAlbums = useMemo(
    () => (Array.isArray(trending.albums) ? trending.albums : []),
    [trending.albums]
  );

  return (
    <section className="my-20">
      <div>
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto">
          Trending Now
        </h2>
        <Slider data={trendingAlbums} />
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto">
          Top Albums
        </h2>
        <Slider data={albums} />
      </div>
    </section>
  );
};

export default MainSection;
