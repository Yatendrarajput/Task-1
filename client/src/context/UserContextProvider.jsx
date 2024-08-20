import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [songsArray, setSongsArray] = useState([]);
    const [audio, setAudio] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);

    const fetchData = async () => {
        const url = "https://cms.samespace.com/items/songs";
        const data = await fetch(url);
        const result = await data.json();
        setSongsArray(result.data);


    };

    useEffect(() => {
        fetchData();

    }, []);


    const value = {
        songsArray,
        setSongsArray,
        audio,
        setAudio,
        currentSongIndex,
        setCurrentSongIndex,
        currentSong,
        setCurrentSong,
    };
    useEffect(() => {
        if (audio) {
            audio.play(); // Automatically play when a new audio is set
        }
    }, [audio]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Add propTypes validation
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default UserContextProvider;
