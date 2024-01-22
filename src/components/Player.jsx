import { useState, useContext, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { BiRepeat } from "react-icons/bi";
import { PiShuffleBold } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import MusicContext from "../context/MusicContext";

const Player = () => {
  const { currentSong, playMusic, isPlaying } = useContext(MusicContext);

  const [timing, setTiming] = useState(0);
  const audioRef = useRef(new Audio(currentSong?.audio));

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      const duration = Number(currentSong.duration);
      const currentTime = audioElement.currentTime;
      console.log("Duration is ", duration, "Current Time is ", currentTime);
      const newTiming = (currentTime / duration) * 100;
      console.log("New Timing is ", newTiming);
      setTiming(newTiming);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, currentSong]);

  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * Number(currentSong.duration);

    // Check if newTime is a valid number before setting currentTime
    if (!isNaN(newTime) && isFinite(newTime) && newTime >= 0) {
      audioRef.current.currentTime = newTime;
      // Optionally, you can update the timing state here if needed
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col ">
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={timing}
        onChange={handleProgressChange}
        className="w-full h-[5px] text-green-400 range"
      />
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
          <IoMdSkipBackward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
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

          <IoMdSkipForward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
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
