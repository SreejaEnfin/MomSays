import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ConfirmDeleteModal from '../modals/ConfirmModal';

interface HeaderProps {
    isChildDetailsActive: boolean;
    isQuestionBankActive: boolean;
    isCreateLaunchTestActive: boolean;
    isVoiceUploaderActive: boolean;
    parentName: string;
}

function DashboardHeader({
    isVoiceUploaderActive,
    isChildDetailsActive,
    isCreateLaunchTestActive,
    isQuestionBankActive,
    parentName,
}: HeaderProps) {
    const [showSettings, setShowSettings] = useState(false);
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);

    const handleLogout = () => {
        setShowConfirmLogout(true);
    };

    const handleEditProfile = () => {
        // Navigate to edit profile or open modal
        console.log('Edit profile clicked');
    };

    const handleChangePhoto = () => {
        // Open modal to change photo
        console.log('Change photo clicked');
    };

    const logout = () => {
        sessionStorage.removeItem('parentToken');
        localStorage.removeItem('parentData');
        localStorage.removeItem('ageGroupCategories');
        window.location.href = '/';
    }

    return (
        <>
            <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-green-700">
                    {isChildDetailsActive
                        ? 'Child Details'
                        : isQuestionBankActive
                            ? 'Question Bank'
                            : isVoiceUploaderActive
                                ? 'Voice Feedback'
                                : isCreateLaunchTestActive
                                    ? 'Create & Launch Test'
                                    : 'Parent Dashboard'}
                </h2>

                <div className="flex items-center space-x-6 text-green-700 font-medium relative">
                    <span>Hi, {parentName}</span>

                    {/* Settings Dropdown */}
                    <div className="relative">
                        <button onClick={() => setShowSettings(!showSettings)} className="hover:text-green-900">
                            <FontAwesomeIcon icon="gear" className="mr-2" />
                        </button>

                        {showSettings && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                                <button
                                    onClick={handleEditProfile}
                                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                    <FontAwesomeIcon icon="right-from-bracket" className="mr-2" /> Edit Profile
                                </button>
                                <button
                                    onClick={handleChangePhoto}
                                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                    <FontAwesomeIcon icon="pen-to-square" className="mr-2" /> Change Photo
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button onClick={handleLogout} className="hover:text-red-600">
                        <FontAwesomeIcon icon="user-circle" />
                    </button>
                </div>
            </header>
            <ConfirmDeleteModal title={"Confirm Logout"} show={showConfirmLogout} message={"Are you sure you want to Logout?"} onCancel={() => setShowConfirmLogout(false)} onConfirm={logout} />
        </>
    );
}

export default DashboardHeader;
