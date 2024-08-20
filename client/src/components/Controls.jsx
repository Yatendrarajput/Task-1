import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaEllipsisH, FaVolumeMute } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';

const Controls = () => {
    const {
        songsArray,
        currentSongIndex,
        audio,
        setAudio,
        setCurrentSongIndex,
        currentSong,
        setCurrentSong,
    } = useContext(UserContext);

    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false); // State for mute/unmute
    const isPlaying = audio && !audio.paused;

    const togglePlayPause = () => {
        if (audio) {
            audio.paused ? audio.play() : audio.pause();
        }
    };

    const handleNextSong = () => {
        if (currentSongIndex !== null) {
            setCurrentSongIndex((currentSongIndex + 1) % songsArray.length);
            if (audio) audio.pause();
            const nextIndex = (currentSongIndex + 1) % songsArray.length;
            const selectedSong = songsArray[nextIndex];
            setCurrentSong(selectedSong);
            const newAudio = new Audio(selectedSong.url);
            setAudio(newAudio);
        }
    };

    const handlePreviousSong = () => {
        if (currentSongIndex !== null) {
            setCurrentSongIndex((currentSongIndex - 1 + songsArray.length) % songsArray.length);
            if (audio) audio.pause();
            const prevIndex = (currentSongIndex - 1 + songsArray.length) % songsArray.length;
            const selectedSong = songsArray[prevIndex];
            setCurrentSong(selectedSong);
            const newAudio = new Audio(selectedSong.url);
            setAudio(newAudio);
        }
    };

    useEffect(() => {
        if (audio) {
            const updateCurrentTime = () => {
                setCurrentTime(audio.currentTime);
            };

            audio.addEventListener('timeupdate', updateCurrentTime);

            return () => {
                audio.removeEventListener('timeupdate', updateCurrentTime);
            };
        }
    }, [audio]);

    const handleTimelineClick = (e) => {
        const timeline = e.target;
        const rect = timeline.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const timelineWidth = rect.width;
        const clickPercentage = clickPosition / timelineWidth;

        if (audio) {
            const newTime = audio.duration * clickPercentage;
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const toggleMute = () => {
        if (audio) {
            audio.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    if (currentSongIndex === null || !songsArray.length) return null;

    const progress = (currentTime / (audio?.duration || 1)) * 100;

    return (
        <div
            style={{
                padding: '0px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                backgroundColor: 'black',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: '#FFFFFF',
                marginTop: '-10px',
            }}
        >
            <div
                style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    lineHeight: '32px',
                }}
            >
                {currentSong?.name}
            </div>
            <div
                style={{
                    fontSize: '16px',
                    color: '#B3B3B3',
                }}
            >
                {currentSong?.artist}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <img
                    src={`https://cms.samespace.com/assets/${currentSong?.cover}`}
                    alt={currentSong?.name}
                    style={{
                        borderRadius: '8px',
                        width: '340px',
                        height: '340px',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Timeline */}
            <div
                style={{
                    width: '340px',
                    height: '6px',
                    gap: '24px',
                    backgroundColor: '#282828',
                    borderRadius: '4px',
                    marginTop: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                }}
                onClick={handleTimelineClick}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                    }}
                />
            </div>

            {/* Controls */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '340px',
                    marginTop: '20px',
                }}
            >
                <button
                    style={{
                        background: '#282828',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer',
                    }}
                >
                    <FaEllipsisH
                        style={{ color: '#FFFFFF', width: '15px', height: '15px' }}
                    />
                </button>

                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handlePreviousSong}
                >
                    <FaBackward
                        style={{ color: '#FFFFFF', width: '15px', height: '15px' }}
                    />
                </button>

                <button
                    style={{
                        background: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '12px',
                        cursor: 'pointer',
                    }}
                    onClick={togglePlayPause}
                >
                    {isPlaying ? (
                        <FaPause
                            style={{ color: 'black', width: '22px', height: '22px' }}
                        />
                    ) : (
                        <FaPlay
                            style={{ color: 'black', width: '22px', height: '22px' }}
                        />
                    )}
                </button>

                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handleNextSong}
                >
                    <FaForward
                        style={{ color: '#FFFFFF', width: '15px', height: '15px' }}
                    />
                </button>

                <button
                    style={{
                        background: '#282828',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={toggleMute} // Mute/Unmute functionality
                >
                    {isMuted ? (
                        <FaVolumeMute style={{ color: '#FFFFFF', width: '15px', height: '15px' }} />
                    ) : (
                        <FaVolumeUp style={{ color: '#FFFFFF', width: '15px', height: '15px' }} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Controls;
