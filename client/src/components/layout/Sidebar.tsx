import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import type { SidebarProps } from '../../types/SidebarProps';

function Sidebar({ isDashboard, isVoiceUploaderActive, isChildDetails, isCreateLaunchTest, isQuestionBank }: SidebarProps) {
    const navigate = useNavigate()
    return (
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-10">
                <img
                    src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                    alt="MomSays Logo"
                    className="w-32 mx-auto"
                />
            </div>

            {/* Menu Items */}
            <nav className="space-y-4">
                <button
                    className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${isDashboard ? 'bg-green-100 font-semibold' : ''
                        }`}
                    onClick={() => navigate('/parent-dashboard')}
                >
                    <FontAwesomeIcon icon="chart-line" className="mr-2" /> Dashboard
                </button>
                <button
                    className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${isChildDetails ? 'bg-green-100 font-semibold' : ''
                        }`}
                    onClick={() => navigate('/parent-dashboard/child-details')}
                >
                    <FontAwesomeIcon icon="child" className="mr-2" /> Child Details
                </button>
                <button
                    className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${isQuestionBank ? 'bg-green-100 font-semibold' : ''
                        }`}
                    onClick={() => navigate('/parent-dashboard/question-bank')}
                >
                    <FontAwesomeIcon icon="book-open" className="mr-2" /> Question Bank
                </button>
                <button
                    className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${isVoiceUploaderActive ? 'bg-green-100 font-semibold' : ''
                        }`}
                    onClick={() => navigate('/parent-dashboard/voice-uploader')}
                >
                    <FontAwesomeIcon icon="microphone" className="mr-2" /> Voice Feedback
                </button>
                <button
                    className={`text-left w-full px-3 py-2 rounded-md text-green-800 font-medium hover:bg-green-100 ${isCreateLaunchTest ? 'bg-green-100 font-semibold' : ''
                        }`}
                    onClick={() => navigate('/parent-dashboard/create-launch-test')}
                >
                    <FontAwesomeIcon icon="vial" className="mr-2" /> Create & Launch Test
                </button>
            </nav>
        </aside>)
}

export default Sidebar