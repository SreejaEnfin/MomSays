import { useState } from 'react';

interface ResetPasswordFormProps {
    onSubmit: (password: string) => void;
    success?: boolean;
    message?: string;
}

export default function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError('Both fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        onSubmit(password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-2">
                <img
                    src={`${import.meta.env.VITE_S3_URL}/logo.png`}
                    alt="MomSays Logo"
                    className="w-28 h-auto"
                />
            </div>
            <div>
                <label htmlFor="password" className="block font-medium text-gray-700">New Password</label>
                <input
                    id="password"
                    type="password"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
                Reset Password
            </button>
        </form>
    )
}
