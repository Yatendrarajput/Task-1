import Controls from '../components/Controls';
import SongList from '../components/SongList';

const HomePage = () => {
    return (
        <div className="relative h-screen bg-black overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[rgba(51,66,94,0.6)] to-black"></div>

            {/* Logo */}
            <div className="absolute top-8 left-8 w-[133.41px] h-[40px] hidden lg:block">
                <img src="SpotifyLogo.png" alt="Logo" className="w-full h-full" />
            </div>

            {/* Login Image */}
            <div className="absolute bottom-10 left-8 w-12 h-12 hidden lg:block">
                <img src="img.png" alt="Login" className="rounded-full w-full h-full" />
            </div>

            {/* Main Content */}
            <div className="absolute inset-0 flex justify-center items-start mt-10 lg:mt-0 lg:flex-row lg:items-start">
                {/* SongList */}
                <div className="w-full max-w-lg p-4 lg:w-1/3">
                    <SongList />
                </div>

                {/* Controls */}
                <div className="w-full max-w-lg p-4 lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
                    <Controls />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
