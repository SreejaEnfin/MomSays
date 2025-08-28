import { Outlet, useNavigate } from 'react-router-dom';
import { useChild } from '../../contexts/ChildContext';
import Loader from '../common/Loader';
import ChildDashboardHeader from './ChildDashboardHeader';

const ChildDashboardLayout = () => {
    const { child } = useChild();
    const navigate = useNavigate();

    if (!child) return <Loader />;

    const { name, testAvailable, testId } = child;

    const handleStartTest = () => {
        if (testAvailable && testId) {
            navigate(`/attend-test/${testId}`);
        } else {
            alert('No test available for today.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInChild');
        sessionStorage.removeItem('childToken');
        window.location.href = '/child-login';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-5">
            <div className="bg-white w-full max-w-7xl min-h-[600px] rounded-xl p-10 shadow-2xl">
                {/* <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm font-bold"
                    style={{ fontSize: '14px' }}
                >
                    <span className="text-lg">👋</span>
                    Bye Bye!
                </button> */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleLogout}
                        className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 text-lg font-bold"
                    >
                        <span className="text-2xl">🏠</span>
                        Go Home
                    </button>
                </div>
                <div className="mb-10">
                    <img
                        src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                        alt="MomSays Logo"
                        className="w-32 mx-auto"
                    />
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-3">
                        Welcome, {name}!
                        <span className="text-4xl ml-2"> 😊</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Your learning dashboard
                    </p>
                </div>

                <div className="text-center">
                    {testAvailable ? (
                        <button
                            onClick={handleStartTest}
                            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg mb-8"
                        >
                            <span className="text-2xl">🎯 </span>
                            Start Today's Test
                            <span className="text-2xl"> ✨</span>
                        </button>
                    ) : (
                        <p className="mb-8 text-green-600 text-lg font-semibold">
                            <span className="text-2xl">😴 </span>
                            No test available today. Check back tomorrow!
                            <span className="text-2xl"> 🌅</span>
                        </p>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ChildDashboardLayout;