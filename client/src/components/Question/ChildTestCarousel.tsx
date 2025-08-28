import { useEffect, useRef, useState } from 'react';
import type { Parent } from '../../types/Parent';
import { useChild } from '../../contexts/ChildContext';
import { SubmitAnswerAPI } from '../../apis/submitAnswer/SubmitAnswerAPI';

type Question = {
    id: string;
    text: string;
    options: string[];
    categoryId: string;
    correctAnswer: number
};

type Props = {
    questions: Question[];
    voiceClips: any
    parent: Parent
    testId: string
};

type Answers = Record<string, { selectedAnswer: string; isCorrect: boolean }>;

function ChildTestCarousel({ questions, voiceClips, parent, testId }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = questions[currentIndex];
    const [selectedOption, setSelectedOption] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [answers, setAnswers] = useState<Answers | null>(null);
    const { child } = useChild();
    const currentAudioRef = useRef<HTMLAudioElement | null>(null); // 🔹 useRef to persist audio
    const readTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!currentQuestion) return;

        // Stop any ongoing reading
        stopReading();

        // Set timer to read question after 2 seconds
        readTimeoutRef.current = setTimeout(() => {
            readQuestionAloud(currentQuestion.text);
        }, 2000);

        // Cleanup timer & stop reading on unmount or question change
        return () => {
            if (readTimeoutRef.current) clearTimeout(readTimeoutRef.current);
            stopReading();
        };
    }, [currentQuestion]);

    useEffect(() => {
        const startSpeech = () => {
            readQuestionAloud(currentQuestion.text);
            window.removeEventListener("click", startSpeech);
        };
        window.addEventListener("click", startSpeech);
        return () => window.removeEventListener("click", startSpeech);
    }, [currentQuestion]);

    const readQuestionAloud = (text: string) => {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        console.log(utterance)

        const setVoiceAndSpeak = () => {
            const voices = speechSynthesis.getVoices();
            const preferred = voices.find(v => v.lang === "en-US" && v.name.includes("Google"));
            if (preferred) utterance.voice = preferred;
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        };

        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
        } else {
            setVoiceAndSpeak();
        }
    };



    const stopReading = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    };

    const goNext = () => {
        if (currentIndex < questions.length - 1) {
            const newAnswer = {
                questionId: currentQuestion.id,
                isCorrect: selectedOption === currentQuestion.correctAnswer,
                parentId: parent.id,
                childId: child?.id
            };

            setCurrentIndex(currentIndex + 1);
            setIsSubmit(false); // reset submission for next question
            setSelectedOption(0); // optionally reset selection
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const playVoiceClip = (url: string) => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }
        const audio = new Audio(url);
        currentAudioRef.current = audio;
        audio.play();
    };

    const getVoiceClipByScenario = (clips: any, scenario: any) => {
        const customClip = clips.find(clip => clip.scenarioCode === scenario && !clip.isDefault);
        if (customClip) return customClip.fileName;

        const defaultClip = clips.find(clip => clip.scenarioCode === scenario && clip.isDefault);
        return defaultClip ? defaultClip.fileName : null;
    };

    const handleSubmit = async () => {
        if (answers) {
            const result = {
                testId: testId,
                parentId: parent.id,
                childId: child?.id,
                attendedDateTime: new Date().toISOString(),
                questions: Object.entries(answers).reduce((acc, [qId, ans]) => {
                    console.log(acc, "acc")
                    console.log(qId, "qId")
                    console.log(ans, "ans")
                    acc[qId] = {
                        selectedAnswer: ans.selectedAnswer,
                        isCorrect: ans.isCorrect
                    };
                    return acc;
                }, {} as Record<string, { selectedAnswer: string; isCorrect: boolean }>)
            };
            const response = await SubmitAnswerAPI(result);
        } else {
            const clipUrl = getVoiceClipByScenario(voiceClips, 'encouragement');
            if (clipUrl) {
                playVoiceClip(`${import.meta.env.VITE_S3_URL}/${clipUrl}`);
            }
        }
    };


    const handleOptionClick = async (index: number) => {
        setSelectedOption(index)
        setIsSubmit(true);
        const isCorrect = index === currentQuestion.correctAnswer;
        const scenario = isCorrect ? 'correct' : 'incorrect';
        setAnswers(prev => ({
            ...(prev || {}),
            [currentQuestion.id]: {
                selectedAnswer: currentQuestion.options[index],
                isCorrect
            }
        }));

        const clipUrl = getVoiceClipByScenario(voiceClips, scenario);
        if (clipUrl) {
            playVoiceClip(`${import.meta.env.VITE_S3_URL}/${clipUrl}`);
        }
    }

    return (
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
            <div className="text-xl font-bold mb-4">
                Q{currentIndex + 1}: {currentQuestion.text}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {currentQuestion && currentQuestion.options.map((opt, idx) => (
                    <button
                        onClick={() => { console.log(opt, idx, "options adn indexes"); handleOptionClick(idx) }}
                        key={idx}
                        className={`py-2 px-4 rounded font-semibold
                            ${answers && answers[currentQuestion.id]?.selectedAnswer === currentQuestion.options[idx]
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                            }`}
                    >
                        {currentQuestion.options[idx]}
                    </button>
                ))}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={goBack}
                    disabled={currentIndex === 0}
                    className={`py-2 px-4 rounded ${currentIndex === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gray-500 text-white'
                        }`}
                >
                    Prev
                </button>

                {currentIndex < questions.length - 1 ? (
                    <button
                        onClick={goNext}
                        className="py-2 px-4 rounded bg-green-500 text-white"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-4 rounded bg-blue-600 text-white"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}

export default ChildTestCarousel;
