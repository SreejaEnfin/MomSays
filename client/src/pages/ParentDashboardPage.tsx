import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader';

export default function ParentDashboardPage() {
    const location = useLocation();
    const isVoiceUploaderActive = location.pathname.includes('/parent-dashboard/voice-uploader');
    const isChildDetails = location.pathname.includes('/parent-dashboard/child-details');
    const isQuestionBank = location.pathname.includes('/parent-dashboard/question-bank');
    const isCreateLaunchTest = location.pathname.includes('/parent-dashboard/create-launch-test');
    const isDashboard = location.pathname === '/parent-dashboard';

    const parentName = JSON.parse(localStorage.getItem('parentData') || '{}')?.name;

    return (
        <div className="flex h-screen bg-green-50 overflow-hidden">

            <Sidebar isDashboard={isDashboard} isVoiceUploaderActive={isVoiceUploaderActive} isChildDetails={isChildDetails} isQuestionBank={isQuestionBank} isCreateLaunchTest={isCreateLaunchTest} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader parentName={parentName} isChildDetailsActive={isChildDetails} isQuestionBankActive={isQuestionBank} isCreateLaunchTestActive={isCreateLaunchTest} isVoiceUploaderActive={isVoiceUploaderActive} />
                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>

            </div>


        </div>
    );
}
