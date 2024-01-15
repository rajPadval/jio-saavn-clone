import { useState } from "react";

const SongItem = () => {
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
    <div>
      <img
        src="https://c.saavncdn.com/572/yes-and-English-2024-20240112113650-500x500.jpg"
        alt=""
      />
      <h3>Yes &amp; No</h3>
      <p>Amrit Maan</p>
      <button onClick={() => playMusic()}>Play song</button>
    </div>
  );
};

export default SongItem;
