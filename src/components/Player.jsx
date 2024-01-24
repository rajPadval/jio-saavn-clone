import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { BiRepeat } from "react-icons/bi";
import { PiShuffleBold } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuHardDriveDownload } from "react-icons/lu";
import MusicContext from "../context/MusicContext";
import VolumeController from "./VolumeController";

const Player = () => {
  const { currentSong, playMusic, isPlaying, prevSong, nextSong } =
    useContext(MusicContext);

  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

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

      const handleSongEnd = () => {
        nextSong();
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleSongEnd);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleSongEnd);
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

  const handleDownloadSong = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log("Response : ", response, "Blob : ", blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${currentSong.name}.mp3`; // You can change the downloaded file name if needed

      // Append the link to the document and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching or downloading the file:", error);
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
     
      <div className="flex justify-between items-center mb-3 px-3">
        <div className="flex justify-start items-center gap-3 lg:w-[30vw] ">
          <img
            src={currentSong?.image}
            alt=""
            width={55}
            className="rounded-lg"
          />
          <div className="hidden lg:block">
            <span>{currentSong?.name}</span>
            <p className="text-xs text-gray-500">
              {currentSong?.primaryArtists}
            </p>
          </div>
        </div>
        <div
          className={`flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center`}
        >
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
        <div
          className="flex  lg:w-[30vw] justify-end items-center "
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
          <LuHardDriveDownload
            onClick={() => handleDownloadSong(currentSong.audio.src)}
            className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer lg:mr-2 "
          />
          <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer hidden lg:block" />
          <VolumeController isVolumeVisible={isVolumeVisible} />
        </div>
      </div>
    </div>
  );
};

export default Player;
