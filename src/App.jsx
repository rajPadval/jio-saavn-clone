import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import MusicContext from "./context/MusicContext";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const playMusic = async (music, name, duration, image, id) => {
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsPlaying(false);
      }
      const newAudio = new Audio(music[0].link);
      setCurrentSong({
        name,
        duration,
        image: image[2].link,
        id,
        audio: newAudio,
      });
      setIsPlaying(true);
      console.log(currentSong)
      await newAudio.play();
    }
  };

  useEffect(() => {
    console.log(currentSong);
  }, [currentSong]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        playMusic,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
        </Routes>
      </BrowserRouter>
    </MusicContext.Provider>
  );
};

export default App;
