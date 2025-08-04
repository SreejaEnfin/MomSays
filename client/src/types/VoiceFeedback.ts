export type VoiceFeedbackType =
    | 'correct'
    | 'incorrect'
    | 'skip'
    | 'timeout'
    | 'encouragement';

export interface VoiceFeedbackScenario {
    code: VoiceFeedbackType;
    title: string;
    emoji: string;
    description: string;
}

export const voiceFeedbackScenarios: VoiceFeedbackScenario[] = [
    {
        code: 'correct',
        title: 'Yay! You Got It!',
        emoji: '🎉',
        description: 'Plays when your child answers correctly.',
    },
    {
        code: 'incorrect',
        title: 'Oops! Try Again',
        emoji: '😬',
        description: 'Plays when your child gives a wrong answer.',
    },
    {
        code: 'skip',
        title: 'Give It a Shot!',
        emoji: '🐛',
        description: 'Plays if your child skips the question.',
    },
    {
        code: 'timeout',
        title: 'Time’s Up, Buddy!',
        emoji: '⏱️',
        description: 'Plays when time runs out on a question.',
    },
    {
        code: 'encouragement',
        title: 'Keep Going, You’re Awesome!',
        emoji: '🚀',
        description: 'General encouragement, used anytime.',
    },
];
