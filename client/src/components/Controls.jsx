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

    const progress = (currentTime / (audio?.duration || 0)) * 100;


    return (
        <div className="p-0 flex flex-col gap-2 bg-transparent rounded-lg shadow-md text-white mt-[60px] ml-[60px]">
            <div className="text-2xl font-bold leading-none">
                {currentSong?.name}
            </div>
            <div className="text-lg text-gray-400">
                {currentSong?.artist}
            </div>
            <div className="flex justify-start items-center">
                <img
                    src={`https://cms.samespace.com/assets/${currentSong?.cover}`}
                    alt={currentSong?.name}
                    className="rounded-lg w-[340px] h-[340px] object-cover"
                />
            </div>

            {/* Timeline */}
            <div
                className="w-[340px] h-1.5 bg-gray-800 rounded-full mt-4 cursor-pointer"
                onClick={handleTimelineClick}
            >
                <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center w-[340px] mt-5">
                <button className="bg-gray-800 rounded-full p-2 cursor-pointer">
                    <FaEllipsisH className="text-white w-4 h-4" />
                </button>

                <button className="bg-transparent border-none cursor-pointer" onClick={handlePreviousSong}>
                    <FaBackward className="text-white w-4 h-4" />
                </button>

                <button
                    className="bg-white rounded-full p-3 cursor-pointer"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? (
                        <FaPause className="text-black w-5 h-5" />
                    ) : (
                        <FaPlay className="text-black w-5 h-5" />
                    )}
                </button>

                <button className="bg-transparent border-none cursor-pointer" onClick={handleNextSong}>
                    <FaForward className="text-white w-4 h-4" />
                </button>

                <button
                    className="bg-gray-800 rounded-full p-2 cursor-pointer"
                    onClick={toggleMute}
                >
                    {isMuted ? (
                        <FaVolumeMute className="text-white w-4 h-4" />
                    ) : (
                        <FaVolumeUp className="text-white w-4 h-4" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Controls;
