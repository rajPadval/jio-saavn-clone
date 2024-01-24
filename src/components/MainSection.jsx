import Slider from "./Slider";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const MainSection = () => {
  const [albums, setAlbums] = useState([]);
  const [trending, setTrending] = useState([]);

  const getHomePageData = async () => {
    const res = await axios.get("https://saavn.me/modules?language=hindi");
    const { data } = await res.data;
    setAlbums(data.albums);
    setTrending(data.trending);
  };

  useEffect(() => {
    getHomePageData();
  }, []);

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
