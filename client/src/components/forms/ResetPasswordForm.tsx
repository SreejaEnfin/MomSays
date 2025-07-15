import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ResetPasswordFormProps {
    onSubmit: (password: string) => void;
    success?: boolean;
    message?: string;
}

export default function ResetPasswordForm({ onSubmit, success, message }: ResetPasswordFormProps) {
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
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>

            {/* ✅ Success Message Box */}
            {success && message && (
                <div className="bg-green-100 text-green-700 border border-green-300 rounded-md p-3 text-center mb-4">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* ✅ Centered Return to Sign In */}
            {success && (
                <div className="text-center mt-6">
                    <Link
                        to="/parent-login"
                        className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300 transition"
                    >
                        Return to Sign In
                    </Link>
                </div>
            )}
        </div>
    );
}
