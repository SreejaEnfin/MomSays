import { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

type Question = {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
};

type Props = {
    questions: Question[];
    selectedQuestionIds?: string[];
    toggleQuestionSelection?: (id: string) => void;
    step?: string; // Optional: you can remove if not used elsewhere
    showSelection?: boolean;
    handleSubmitTest?: () => void;
};

export const QuestionCarousel = ({
    questions,
    selectedQuestionIds = [],
    toggleQuestionSelection,
    step,
    showSelection = false
}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!questions || questions.length === 0) {
        return <Typography>No questions available</Typography>;
    }

    const next = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const currentQuestion = questions[currentIndex];
    const isSelected = showSelection && selectedQuestionIds.includes(currentQuestion.id);

    return (
        <div className='min-w-[600px] mx-auto w-full'>
            <Card variant="outlined" style={{ marginBottom: '16px' }}>
                <CardContent>
                    <Typography variant="h6">
                        Q{currentIndex + 1}: {currentQuestion.text}
                    </Typography>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {currentQuestion.options.map((option, i) => {
                            const isCorrect = i === currentQuestion.correctAnswer;

                            return (
                                <div
                                    key={i}
                                    className={`flex items-start gap-2 p-2 rounded-md
                                        ${isCorrect ? 'bg-green-200 border border-green-600 font-bold' : ''}`}
                                >
                                    <Typography variant="body1" fontWeight="bold">
                                        {String.fromCharCode(65 + i)}.
                                    </Typography>
                                    <Typography variant="body1">{option}</Typography>
                                </div>
                            );
                        })}
                    </div>

                    {showSelection && toggleQuestionSelection && (
                        <Button
                            variant={isSelected ? 'contained' : 'outlined'}
                            color={isSelected ? 'success' : 'primary'}
                            onClick={() => toggleQuestionSelection(currentQuestion.id)}
                            style={{ marginTop: '12px' }}
                        >
                            {isSelected ? 'Selected' : 'Select this Question'}
                        </Button>
                    )}
                </CardContent>
            </Card>

            <div className='flex justify-center gap-10 mt-6'>
                <Button onClick={prev} disabled={currentIndex === 0}>Previous</Button>
                <Button onClick={next} disabled={currentIndex === questions.length - 1}>Next</Button>
            </div>
        </div>
    );
};
