import { useState } from "react";

const SongItem = ({ name, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = () => {
    let song = new Audio("https://www.jiosaavn.com/song/yes-and/FSYFRB9Sdh4");
    if (isPlaying) {
      song.pause();
      setIsPlaying(false);
      console.log("Music is paused");
      return;
    } else {
      song.play();
      setIsPlaying(true);
      console.log("Music is playing");
    }
  };

  return (
    <div className="w-[160px] max-h-[220px] overflow-y-clip flex flex-col justify-center items-center gap-3  scroll-hide rounded-lg">
      <img src={image[2].link} alt="" className="rounded-lg" />
      <div className="text-[13px] w-full flex flex-col justify-center items-center ">
        <span className=" font-semibold overflow-x-clip">
          {name}
        </span>
      </div>
    </div>
  );
};

export default SongItem;
