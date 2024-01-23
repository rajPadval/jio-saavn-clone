import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import MusicContext from "./context/MusicContext";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);

  const playMusic = async (
    music,
    name,
    duration,
    image,
    id,
    primaryArtists
  ) => {
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
        primaryArtists,
      });
      setIsPlaying(true);
      console.log(currentSong);
      await newAudio.play();
    }
  };

  useEffect(() => {
    console.log(currentSong, songs);
  }, [currentSong]);

  const nextSong = () => {
    console.log("Next Song Clicked");

    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === songs.length - 1) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[0];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index + 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };

  const prevSong = () => {
    console.log("Previous Song Clicked");
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === 0) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[songs.length - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        playMusic,
        songs,
        setSongs,
        nextSong,
        prevSong,
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
