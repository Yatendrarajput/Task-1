import Controls from '../components/Controls';
import SongList from '../components/SongList';

const HomePage = () => {

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            background: 'linear-gradient(0deg, #000000, #000000), linear-gradient(108.18deg, rgba(51, 66, 94, 0.6) 2.46%, rgba(0, 0, 0, 0.6) 99.84%)',
            overflow: 'hidden' // Ensure that any overflow content is hidden 
        }}>
            {/* Logo */}
            <div style={{
                position: 'absolute',
                top: '32px',
                left: '32px',
                width: '133.41px',
                height: '40px',
                padding: '0'
            }}>
                <img src="SpotifyLogo.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
            </div>
            {/* Login Image */}
            <div style={{
                position: 'absolute',
                top: '615px',
                left: '32px',
                padding: '0'
            }}>
                <img src="img.png" alt="Login" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            </div>
            {/* SongList */}
            <div style={{
                position: 'absolute',
                width: '432px',
                height: '856px',
                top: '40px',
                left: '350px',
                opacity: 1 // Make sure the SongList is visible
            }}>
                <SongList />
            </div>
            {/* Controls */}
            <div style={{
                position: 'absolute',
                width: '480px',
                height: '692.24px',
                top: '101px',
                left: '950px',
                opacity: '1', // Make sure the Controls are visible
                gap: '32px'
            }}>
                <Controls />
            </div>
        </div>
    );
};

export default HomePage;