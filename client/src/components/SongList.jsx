import { useContext, useEffect, useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import UserContext from '../context/UserContext';

const SongList = () => {
    const {
        songsArray,
        audio,
        setAudio,
        currentSongIndex,
        setCurrentSongIndex,
        setCurrentSong,
    } = useContext(UserContext);

    const [view, setView] = useState('forYou'); // State to manage the current view
    const [search, setSearch] = useState("");
    const [filteredSongs, setFilteredSongs] = useState(songsArray);
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown on mobile screens

    const handleSongClick = (song, index) => {
        if (audio) {
            audio.pause(); // Pause the current audio
        }
        const newAudio = new Audio(song.url);
        setAudio(newAudio); // Set the new audio in the context
        setCurrentSongIndex(index); // Set the current song index in the context
        setCurrentSong(song);
    };

    useEffect(() => {
        if (search === "") {
            if (view !== "forYou") {
                const filtered = songsArray.filter(song => song.top_track);
                setFilteredSongs(filtered);
            } else {
                setFilteredSongs(songsArray);
            }
        } else {
            const searchSongsList = songsArray.filter(song =>
                song.name.toLowerCase().includes(search.toLowerCase()) ||
                song.artist.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredSongs(searchSongsList);
        }
    }, [view, search, songsArray]);

    return (
        <div className="w-full max-w-lg h-full max-h-[700px] flex flex-col justify-start text-white p-4 box-border mt-[-15px]">
            {/* Top Buttons - Hidden on Mobile */}
            <div className={`hidden md:flex gap-5 mb-4 flex-wrap ${showDropdown ? 'mt-0' : 'mt-4'}`}>
                <button
                    onClick={() => setView('forYou')}
                    className={`font-inter transition-opacity text-lg md:text-xl font-bold ${view === 'forYou' ? 'opacity-100' : 'opacity-50'
                        } bg-transparent border-none cursor-pointer`}
                >
                    <span className='text-3xl'>  For You</span>
                </button>
                <button
                    onClick={() => setView('topTracks')}
                    className={`font-inter transition-opacity text-lg md:text-xl font-bold ${view === 'topTracks' ? 'opacity-100' : 'opacity-50'
                        } bg-transparent border-none cursor-pointer`}
                >
                    <span className='text-3xl'>  Top Tracks</span>
                </button>
            </div>

            {/* Dropdown Button for Mobile */}
            <div className="flex md:hidden justify-between items-center mb-4 mt-[-40px]">
                <span className="text-2xl font-bold">Music</span>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-white focus:outline-none"
                >
                    <FaChevronDown />
                </button>
            </div>

            {/* Dropdown Menu for Mobile */}
            {showDropdown && (
                <div className="flex md:hidden flex-col gap-3 mb-4 ">
                    <button
                        onClick={() => { setView('forYou'); setShowDropdown(false); }}
                        className={`font-inter text-lg font-bold ${view === 'forYou' ? 'opacity-100' : 'opacity-50'
                            } bg-transparent border-none cursor-pointer`}
                    >
                        For You

                    </button>
                    <button
                        onClick={() => { setView('topTracks'); setShowDropdown(false); }}
                        className={`font-inter text-lg font-bold ${view === 'topTracks' ? 'opacity-100' : 'opacity-50'
                            } bg-transparent border-none cursor-pointer`}
                    >
                        Top Tracks
                    </button>
                </div>
            )}

            {/* Search Bar */}
            <div className="w-full max-w-xs h-10 flex rounded-lg bg-gray-800 p-2 mb-4 shadow-md ">
                <input
                    type="text"
                    placeholder="Search Song, Artist"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-400"
                />
                <button className="bg-transparent border-none cursor-pointer">
                    <FaSearch className="text-white w-5 h-5" />
                </button>
            </div>

            {/* Song List */}
            <div className="flex flex-col gap-2 flex-1 ">
                {filteredSongs.map((song, index) => (
                    <div
                        key={index}
                        onClick={() => handleSongClick(song, index)}
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${currentSongIndex === index
                            ? 'bg-gray-800 h-14 max-w-xs'
                            : 'bg-transparent h-16'
                            }`}
                    >
                        <img
                            src={`https://cms.samespace.com/assets/${song.cover}`}
                            alt={song.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <p className="text-base font-inter text-white m-0">{song.name}</p>
                            <p className="text-sm font-inter text-gray-400 m-0">{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongList;
