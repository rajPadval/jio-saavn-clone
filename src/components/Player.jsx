import { useEffect, useState } from "react";

const Player = () => {
  const [timing, setTiming] = useState(0);

  const handleProgressChange = (event) => {
    setTiming(parseFloat(event.target.value));
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff]">
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={timing}
        onChange={handleProgressChange}
        className="w-full h-[5px] text-green-400 range"
      />
      <div>
        <img
          src="https://c.saavncdn.com/903/Tu-hai-kahan-Hindi-2024-20240111181431-500x500.jpg"
          alt=""
          width={70}
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Player;
