import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Player from './Player';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// ...

const FavSongs = () => {
    const [favSongs, setFavSongs] = useState(useSelector((state) => state.fav.favSongs));
    const [playerData, setPlayerData] = useState(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const handleCardClick = (clickedItem) => {
        const { preview, album } = clickedItem;
        setPlayerData({
            track: preview,
            image: album.cover_small,
            title: album.title,
        });
        setIsPlayerVisible(true);
    };

   let  updatedFavSongs = favSongs

    const handleRemoveSong = (index) => {
        updatedFavSongs = favSongs.filter((song, i) => i !== index);
        setPlayerData(null);
        setIsPlayerVisible(false);
        setFavSongs(updatedFavSongs);
        return updatedFavSongs
    };

    return (
        <div>
            <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                </svg>
            </Link>
            <h2>Canzoni Preferite: </h2>
            <ol>
                {updatedFavSongs.map((song, index) => (
                    <li key={index} className='m-3 d-flex align-items-center border border-success p-4' onClick={() => handleCardClick(song)}>
                        <img src={song.album.cover_medium} alt="" className='me-3' />
                        <div>
                            <p className='fs-3'>{song.title} - <span className='fs-5'>{song.artist.name}</span></p>
                            <p className='text-secondary'> {song.album.title}</p>
                        </div>
                        <Button className='align-self-start' onClick={() => handleRemoveSong(index)}>❌</Button>
                    </li>
                ))}
            </ol>
            {isPlayerVisible && <Player {...playerData} />}
        </div>
    );
};

export default FavSongs;
