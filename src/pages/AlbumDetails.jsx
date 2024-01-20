import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Player from '../components/Player'
import SongList from '../components/SongList'

const AlbumDetails = () => {

    const [album, setAlbum] = useState([])

    const { id } = useParams()

    const getAlbumDetails = async () => {
        const res = await axios.get(`https://saavn.me/albums?id=${id}`);
        const { data } = await res.data
        console.log(data)
        setAlbum(data)
    }

    useEffect(() => {
        getAlbumDetails()
    }, [])


    return (
        <>
            <Navbar />

            <div className='flex justify-center items-center gap-8 h-screen'>
                <div>

                    <img src={"https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191036-500x500.jpg"} alt={album.title} width={250} />
                    {/* <img src={album.image[2].link} alt={album.title} width={250} /> */}

                    <div>

                    </div>
                    <h1>{album.name}</h1>
                    <p>by {album.primaryArtists} . {album.songCount} songs</p>
                </div>
                <div>
                    {
                        album.songs?.map((song) => {
                            return <SongList key={song.id} {...song} />
                        })
                    }

                </div>
            </div>

            <Player />
        </>
    )
}

export default AlbumDetails