import React from 'react'
import { GoPlay } from "react-icons/go";
const SongList = ({ name, primaryArtists, duration }) => {

    const convertTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds}`
    }

    return (
        <div className='flex justify-between items-center gap-2 p-1 px-3 hover:bg-white hover:shadow-md'>
            <div className='flex gap-2 justify-center items-center'>
                <GoPlay className='text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor-pointer' />
                <span className='font-bold text-sm'>{name}</span>
            </div>
            <div className=''>
                <span className='font-thin text-sm text-gray-500'>{primaryArtists}</span>
            </div>
            <div>
                <span className='font-thin text-sm text-gray-500'>{convertTime(duration)}</span>
            </div>
        </div>
    )
}

export default SongList