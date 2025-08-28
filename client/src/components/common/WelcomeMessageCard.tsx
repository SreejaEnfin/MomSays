import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useParent } from '../../contexts/ParentContext';
import { MarkWelcomeMessageSeen } from '../../apis/user/MarkWelcomeMessageSeen';

const message =
    "Dedicated to all the moms who teach, guide, and love endlessly — and to those who silently carry the weight of worries, guilt, and sacrifices. This app is for you.";

function WelcomeMessageCard() {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [doneTyping, setDoneTyping] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const { parent } = useParent();
    let parentData = parent

    useEffect(() => {
        if (parent?.hasSeenWelcomeMessage) return;

        const typeSound = new Audio(
            'https://assets.mixkit.co/sfx/download/mixkit-typewriter-click-1125.mp3'
        );
        typeSound.volume = 0.3;
        setAudio(typeSound);
    }, [parent]);

    useEffect(() => {
        if (parent?.hasSeenWelcomeMessage || !audio) return;

        const interval = setInterval(() => {
            if (index < message.length) {
                setDisplayedText((prev) => prev + message[index]);
                setIndex((prev) => prev + 1);

                try {
                    audio.currentTime = 0;
                    audio.play().catch(() => { });
                } catch (e) {
                    // silently fail
                }
            } else {
                clearInterval(interval);
                setDoneTyping(true);
            }
        }, 90);

        return () => clearInterval(interval);
    }, [index, audio, parent]);

    const handleContinue = async () => {
        setIsVisible(false); // <-- HIDE MODAL IMMEDIATELY

        confetti({
            particleCount: 120,
            spread: 120,
            origin: { y: 0.4 },
        });

        const response = await MarkWelcomeMessageSeen(parent?.id);
        console.log(response, "response from mark welcome message seen");
        if (parentData) {
            if (response.success) {
                parentData.hasSeenWelcomeMessage = true;
                localStorage.setItem('parentData', JSON.stringify(parentData));
            }
        }

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    // If modal is hidden or welcome already seen, do not show it
    if (!isVisible || parent?.hasSeenWelcomeMessage) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md p-6 text-gray-700 text-center text-base leading-relaxed relative">
                <p
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                        __html: displayedText.replace(
                            /This app is for you\./,
                            'This app is for <strong class="text-lg font-semibold text-green-700">YOU</strong>.'
                        ),
                    }}
                />

                {doneTyping && (
                    <button
                        onClick={handleContinue}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}

export default WelcomeMessageCard;
