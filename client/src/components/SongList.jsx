///songlist correct

import { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
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
    const handleSongClick = (song, index) => {
        if (audio) {
            console.log(audio);
            audio.pause(); // Pause the current audio
        }
        const newAudio = new Audio(song.url);
        // newAudio.play(); // Play the new audio
        setAudio(newAudio); // Set the new audio in the context
        setCurrentSongIndex(index); // Set the current song index in the context
        setCurrentSong(song);

        console.log(index);

    };

    useEffect(() => {
        if (search == "") {
            if (view != "forYou") {
                const filtered = songsArray.filter(song => song.top_track);
                setFilteredSongs(filtered);
            } else {
                setFilteredSongs(songsArray)
            }

        } else {
            const searchSongsList = songsArray.filter(song =>
                song.name.toLowerCase().includes(search.toLowerCase()) ||
                song.artist.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredSongs(searchSongsList);
        }
    }, [view, search, songsArray]);


    // Filter songs based on the current view
    // const filteredSongs = view === 'forYou'
    //     ? songsArray
    //     : songsArray.filter(song => song.top_track);

    return (
        <div style={{
            width: '432px',
            height: '700px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            color: '#FFFFFF'
        }}>
            {/* Top Texts */}
            <div style={{
                display: 'flex',
                gap: '40px',
                marginBottom: '16px',
            }}>
                <button
                    onClick={() => setView('forYou')}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: '700',
                        lineHeight: '32px',
                        color: '#FFFFFF',
                        opacity: view === 'forYou' ? '100%' : '50%', // Opacity based on view
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    For You
                </button>
                <button
                    onClick={() => setView('topTracks')}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: '700',
                        lineHeight: '32px',
                        color: '#FFFFFF',
                        opacity: view === 'topTracks' ? '100%' : '50%', // Opacity based on view
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Top Tracks
                </button>
            </div>

            {/* Search Bar */}
            <div style={{
                width: '400px',
                height: '42px',
                display: 'flex',
                borderRadius: '8px',
                backgroundColor: '#282828',
                padding: '8px 16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}>
                <input
                    type="text"
                    placeholder="Search Song, Artist"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '16px',
                        color: 'white',
                        backgroundColor: 'transparent'
                    }}
                />
                <button style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                }}>
                    <FaSearch style={{ color: '#FFFFFF', width: '19.3px', height: '19.33px' }} />
                </button>
            </div>

            {/* Song List */}
            <div style={{
                marginTop: '8px',
                height: '70px',
                width: '400px',
            }}>
                {filteredSongs.map((song, index) => (
                    <div
                        key={index}
                        onClick={() => { handleSongClick(song, index) }}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: currentSongIndex === index ? '60px' : '70px',
                            width: '400px',
                            padding: currentSongIndex === index ? '12px' : '16px',
                            borderRadius: '8px',
                            backgroundColor: currentSongIndex === index ? '#282828' : 'transparent',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src={`https://cms.samespace.com/assets/${song.cover}`}
                            alt={song.name}
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '56px',
                                marginLeft: '0px',
                                marginRight: '16px',
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <p style={{
                                margin: 0,
                                fontSize: '18px',
                                fontFamily: 'Inter, sans-serif',
                                color: '#FFFFFF',
                            }}>{song.name}</p>
                            <p style={{
                                margin: 0,
                                fontSize: '12px',
                                fontFamily: 'Inter, sans-serif',
                                color: '#CCCCCC',
                            }}>{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongList;
