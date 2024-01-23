import { useContext, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { BiRepeat } from "react-icons/bi";
import { PiShuffleBold } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import MusicContext from "../context/MusicContext";

const Player = () => {
  const { currentSong, playMusic, isPlaying, prevSong, nextSong } =
    useContext(MusicContext);

  const inputRef = useRef();

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      const handleTimeUpdate = () => {
        const duration = Number(currentSong.duration);
        const currentTime = audioElement.currentTime;
        const newTiming = (currentTime / duration) * 100;
        inputRef.current.value = newTiming;
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentSong]);

  const handleProgressChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    const newTime = (newPercentage / 100) * Number(currentSong.duration);

    if (!isNaN(newTime) && isFinite(newTime) && newTime >= 0) {
      currentSong.audio.currentTime = newTime;
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col ">
      <input
        type="range"
        ref={inputRef}
        min="0"
        max="100"
        step="0.1"
        value={0}
        onChange={handleProgressChange}
        className="w-full h-[5px] text-green-400 range "
      />
      {/* <input
        type="range"
        ref={inputRef}
        value={0}
        max={100}
        onChange={handleProgressChange}
        className="w-full h-[5px] text-green-400 range transition-all duration-1000 ease-linear"
      /> */}
      <div className="flex justify-between items-center mb-3 px-3">
        <div>
          <img
            src={currentSong?.image}
            alt=""
            width={55}
            className="rounded-lg"
          />
        </div>
        <div className="flex text-3xl gap-6">
          <BiRepeat className="text-gray-400 " />
          <IoMdSkipBackward
            onClick={prevSong}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          />
          {isPlaying ? (
            <FaPause
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong.audio,
                  currentSong.name,
                  currentSong.duration,
                  currentSong.image,
                  currentSong.id
                )
              }
            />
          ) : (
            <FaPlay
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong.audio,
                  currentSong.name,
                  currentSong.duration,
                  currentSong.image,
                  currentSong.id
                )
              }
            />
          )}

          <IoMdSkipForward
            onClick={nextSong}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          />
          <PiShuffleBold className="text-gray-400  cursor-pointer" />
        </div>
        <div>
          <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-3xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Player;
