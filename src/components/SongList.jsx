import React, { useState } from "react";
import { GoPlay } from "react-icons/go";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setAudio, setIsPlaying } from "../../redux/slices/audioSlice";

const SongList = ({ name, primaryArtists, duration, downloadUrl }) => {
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  };

  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.audio.isPlaying);
  const audio = useSelector((state) => state.audio.audio);

  const playMusic = async (music) => {
    if (audio) {
      if (isPlaying) {
        dispatch(setIsPlaying(false));
        audio.pause();
      } else {
        dispatch(setIsPlaying(true));
        await audio.play();
      }
    } else {
      const newAudio = new Audio(music[0].link);
      console.log(newAudio)
      dispatch(setAudio(newAudio));
      dispatch(setIsPlaying(true));
      await newAudio.play();
    }
  };

  return (
    <div className="flex justify-between items-center lg:w-[55vw] mb-2 lg:mb-1 p-1 px-3 hover:bg-white hover:shadow-md">
      {isPlaying ? (
        <AiOutlinePauseCircle
          onClick={() => playMusic(downloadUrl)}
          className="text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor-pointer"
        />
      ) : (
        <GoPlay
          onClick={() => playMusic(downloadUrl)}
          className="text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor-pointer"
        />
      )}

      <div className="flex flex-col lg:flex-row gap-2 justify-between items-start w-[80%]">
        <span className="font-bold text-xs">{name}</span>
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

export default SongList;
