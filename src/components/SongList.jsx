import { useContext } from "react";
import { GoPlay } from "react-icons/go";
import { AiOutlinePauseCircle } from "react-icons/ai";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setAudio,
//   setCurrentSong,
//   setIsPlaying,
// } from "../../redux/slices/audioSlice";

import MusicContext from "../context/MusicContext";
import PropTypes from "prop-types";

const SongList = ({
  name,
  primaryArtists,
  duration,
  downloadUrl,
  image,
  id,
}) => {
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  };

  const { isPlaying, playMusic, currentSong } = useContext(MusicContext);

  return (
    <div className="flex justify-between items-center lg:w-[55vw] mb-2 lg:mb-1 p-1 px-3 hover:bg-white hover:shadow-md">
      <GoPlay
        onClick={() => playMusic(downloadUrl, name, duration, image, id)}
        className="text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor-pointer"
      />

      <div className="flex flex-col lg:flex-row gap-2 justify-between items-start w-[80%]">
        <span
          className={`font-bold text-xs ${
            id === currentSong?.id && "text-[#46c7b6ff]"
          }`}
        >
          {name}
        </span>
        <span className="font-thin text-xs text-gray-500">
          {primaryArtists}
        </span>
      </div>
      <div>
        <span className="font-thin text-xs text-gray-500 hidden lg:block">
          {convertTime(duration)}
        </span>
      </div>
    </div>
  );
};

SongList.propTypes = {
  name: PropTypes.string.isRequired,
  primaryArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.string.isRequired,
  downloadUrl: PropTypes.array.isRequired,
  image: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default SongList;
