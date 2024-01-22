import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongList from "../components/SongList";

const AlbumDetails = () => {
  const [album, setAlbum] = useState([]);
  const [image, setImage] = useState("");

  const { id } = useParams();

  const getAlbumDetails = async () => {
    const res = await axios.get(`https://saavn.me/albums?id=${id}`);
    const { data } = await res.data;
    console.log(data);
    setAlbum(data);
    setImage(getImg(data.image));
  };

  const getImg = (image) => (image = image[2].link);

  useEffect(() => {
    getAlbumDetails();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 h-screen my-48  lg:my-0  mx-2  lg:mx-auto ">
        <div>
          {/* <img src={"https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191036-500x500.jpg"} alt={album.title} width={250} /> */}
          <img src={image} alt={album.title} width={250} />

          <div></div>
          <h1>{album.name}</h1>
          <p>
            by {album.primaryArtists} . {album.songCount} songs
          </p>
        </div>
        <div>
          {album.songs?.map((song) => {
            return <SongList key={song.id} {...song} />;
          })}
        </div>
      </div>

      <Player />
    </>
  );
};

export default AlbumDetails;
