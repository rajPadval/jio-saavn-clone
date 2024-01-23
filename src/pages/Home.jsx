import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAlbums,
    setPlaylists,
    setCharts,
    setTrending,
} from "../../redux/slices/homePageSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import Player from "../components/Player";
import SearchSection from "../components/SearchSection";


export default function Home() {
    const dispatch = useDispatch();

    // const [albums, setAlbums] = useState([]);
    // const [playlists, setPlaylists] = useState([]);
    // const [artists, setArtists] = useState([]);
    // const [trending, setTrending] = useState([]);

    const getHomePageData = async () => {
        const res = await axios.get("https://saavn.me/modules?language=hindi");
        const { data } = await res.data;
        // console.log(data);
        // setAlbums(data.albums);
        // setPlaylists(data.playlists);
        // setArtists(data.artists);
        // setTrending(data.trending);
        dispatch(setTrending(data.trending));
        dispatch(setAlbums(data.albums));
        dispatch(setPlaylists(data.playlists));
        dispatch(setCharts(data.charts));
    };

    useEffect(() => {
        getHomePageData();
    }, []);

    return (
        <>
            <Navbar />
            <SearchSection/>
            <MainSection />
            <Player />
        </>
    );
}
