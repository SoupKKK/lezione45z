import React, { useState, useEffect } from 'react';

const Player = ({ track, image, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(track));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setAudio(new Audio(track));
    setProgress(0);
    setIsPlaying(false);
  }, [track]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);


  return (
    <div className="player-container fixed-bottom p-4 ms-1 me-1">
      <div className="controls">
        <img src={image} alt="" />
        <p>{title}</p>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="progress-container mt-2" style={{border: "1px solid black", borderRadius: "5px"}}>
          <div
            className="progress-bar"
            style={{ width: `${progress}%`, height: '5px', background: 'green', borderRadius: "5px" }}
          ></div>
        </div>
      </div>
      
    </div>
  );
};

export default Player;
