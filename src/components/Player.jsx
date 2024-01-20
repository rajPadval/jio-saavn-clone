import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { BiRepeat } from "react-icons/bi";
import { PiShuffleBold } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
const Player = () => {
  const [timing, setTiming] = useState(0);

  const handleProgressChange = (event) => {
    setTiming(parseFloat(event.target.value));
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
            src="https://c.saavncdn.com/903/Tu-hai-kahan-Hindi-2024-20240111181431-500x500.jpg"
            alt=""
            width={55}
            className="rounded-lg"
          />
        </div>
        <div className="flex text-3xl gap-6">
          <BiRepeat className="text-gray-400 " />
          <IoMdSkipBackward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
          <FaPlay className="text-gray-700 hover:text-gray-500 cursor-pointer" />
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