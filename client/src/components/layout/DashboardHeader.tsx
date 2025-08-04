interface HeaderProps {
    isChildDetailsActive: boolean,
    isQuestionBankActive: boolean,
    isCreateLaunchTestActive: boolean,
    isVoiceUploaderActive: boolean,
    parentName: string | ''
}

function DashboardHeader({ isVoiceUploaderActive, isChildDetailsActive, isCreateLaunchTestActive, isQuestionBankActive, parentName }: HeaderProps) {
    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-green-700">
                {isChildDetailsActive
                    ? 'Child Details'
                    : isQuestionBankActive
                        ? 'Question Bank'
                        : isVoiceUploaderActive
                            ? 'Voice Feedback' : isCreateLaunchTestActive ?
                                'Create & Launch Test' : 'Parent Dashboard'}
            </h2>
            <div className="text-green-700 font-medium">
                Hi, {parentName}
            </div>
        </header>
    )
}

export default DashboardHeader