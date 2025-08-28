import { Player } from '@lottiefiles/react-lottie-player';

const Loader = () => {
    const animation = `${import.meta.env.VITE_S3_URL}/jsons/loader.json`;

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white text-center px-4">
            <Player
                autoplay
                loop
                src={animation}
                style={{ height: '300px', width: '300px' }}
            />
            <p className="text-lg font-semibold mt-6 text-gray-700">
                Just a moment... Your magical world is loading! ✨
            </p>
        </div>
    );
};

export default Loader;
