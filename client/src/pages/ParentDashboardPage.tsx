import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader';
import WelcomeMessageCard from '../components/common/WelcomeMessageCard';
import { useEffect, useState } from 'react';
import Loader from '../components/common/Loader'; // Assuming you have a loader

export default function ParentDashboardPage() {
    const location = useLocation();
    const isVoiceUploaderActive = location.pathname.includes('/parent-dashboard/voice-uploader');
    const isChildDetails = location.pathname.includes('/parent-dashboard/child-details');
    const isQuestionBank = location.pathname.includes('/parent-dashboard/question-bank');
    const isCreateLaunchTest = location.pathname.includes('/parent-dashboard/create-launch-test');
    const isDashboard = location.pathname === '/parent-dashboard';

    const [isLoading, setIsLoading] = useState(true);
    const [parentName, setParentName] = useState('');

    useEffect(() => {
        const parent = JSON.parse(localStorage.getItem('parentData') || '{}');
        if (parent?.name) {
            setParentName(parent.name);
        }
        setIsLoading(false); // Safe to always set this once checked
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="flex h-screen bg-green-50 overflow-hidden">
            <Sidebar
                isDashboard={isDashboard}
                isVoiceUploaderActive={isVoiceUploaderActive}
                isChildDetails={isChildDetails}
                isQuestionBank={isQuestionBank}
                isCreateLaunchTest={isCreateLaunchTest}
            />
            <div className="flex-1 flex flex-col">
                <DashboardHeader
                    parentName={parentName}
                    isChildDetailsActive={isChildDetails}
                    isQuestionBankActive={isQuestionBank}
                    isCreateLaunchTestActive={isCreateLaunchTest}
                    isVoiceUploaderActive={isVoiceUploaderActive}
                />
                <main className="p-6 flex-1 overflow-y-auto">
                    <WelcomeMessageCard />
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
