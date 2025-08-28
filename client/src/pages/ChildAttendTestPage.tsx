import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestQuestionsAPI } from '../apis/testSet/GetTestSetQuestionAPI';
import ChildTestCarousel from '../components/Question/ChildTestCarousel';
import { GetVoiceFeedbackAPI } from '../apis/voiceFeedback/GetVoiceFeedbackAPI';
import type { Parent } from '../types/Parent';

function ChildAttendTestPage() {
    const { testId } = useParams<{ testId: string }>();
    const [testQuestions, setTestQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
    const [parent, setParent] = useState<Parent | null>(null);
    const [voiceClips, setVoiceClips] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (testId) {
            getTestQuestions(testId);
            getVoiceClips();
        }
    }, [testId]);

    const getTestQuestions = async (id: string) => {
        try {
            const response = await getTestQuestionsAPI(id);
            if (response) {
                if (response.testSet && response.testSet.questions.length > 0 && response.voiceClips) {
                    setParent(response.testSet.parent);
                    setTestQuestions(response.testSet.questions);
                    setVoiceClips(response.voiceClips);
                }
            }
        } catch (error) {
            console.error("Error fetching test questions:", error);
        }
    };

    const getVoiceClips = async () => {
        try {
            if (parent) {
                const response = await GetVoiceFeedbackAPI(parent.id);
                console.log(response, "response")
                if (response.ok) {
                    console.log(response)
                    setVoiceClips(response)
                }
            }
        } catch (e) {
            console.error("Error", e)
        }
    }

    const handleSelectAnswer = (questionId: string, optionIndex: number) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            {(testQuestions.length > 0 && parent && testId) ? (
                <ChildTestCarousel
                    questions={testQuestions}
                    voiceClips={voiceClips}
                    parent={parent ?? parent}
                    testId={testId}
                // answers={selectedAnswers}
                // onSelectAnswer={handleSelectAnswer}
                />
            ) : (
                <p>Loading questions...</p>
            )}
            <div className="absolute bottom-4 left-4 flex gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 text-lg font-bold"
                >
                    <span className="text-2xl">«</span>
                    Back
                </button>
            </div>

        </div>
    );
}

export default ChildAttendTestPage;
