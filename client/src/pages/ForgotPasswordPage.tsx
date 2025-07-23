import { useState } from 'react';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { ForgotPasswordAPI } from '../apis/user/ForgotPasswordAPI';

type ForgotPasswordForm = {
    email: string;
};

function ForgotPasswordPage() {
    const [message, setMessage] = useState('');
    const [resetKey, setResetKey] = useState(0);

    const handleForgotPassword = async (data: ForgotPasswordForm) => {
        try {
            const response = await ForgotPasswordAPI(data);

            if (response.status === 'success') {
                setMessage('📧 If this email is registered, a reset link has been sent.');
                setResetKey(prevKey => prevKey + 1);
            } else {
                setMessage(`❌ ${response.message || 'Failed to send email.'}`);
            }
        } catch (err) {
            setMessage('❌ An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <ForgotPasswordForm onSubmit={handleForgotPassword} message={message} key={resetKey} />
        </div>
    );
}

export default ForgotPasswordPage;
