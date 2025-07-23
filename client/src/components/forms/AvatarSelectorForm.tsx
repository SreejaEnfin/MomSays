import React from 'react';

interface AvatarSelectorProps {
    selectedAvatar: string;
    onSelect: (filename: string) => void;
}

const avatarOptions = [
    'ai-dog.png',
    'cute.png',
    'cute-frog.png',
    'cute-tiger.png',
    'digital-cat.png',
    'female-lion.png',
    'little-tiger.png',
    'old-lion.png',
    'red-bird.png',
    'red-dog.png',
];

const AvatarSelectorForm: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelect }) => {
    return (
        <div className="grid grid-cols-5 gap-4 mt-4">
            {avatarOptions.map((filename) => (
                <img
                    key={filename}
                    src={`${import.meta.env.VITE_S3_URL}/avatars/${filename}`}
                    alt={filename}
                    className={`w-20 h-20 object-cover rounded-full border-4 cursor-pointer transition 
            ${selectedAvatar === filename ? 'border-green-500 scale-105' : 'border-transparent'}
          `}
                    onClick={() => onSelect(filename)}
                />
            ))}
        </div>
    );
};

export default AvatarSelectorForm;
