import { useState } from 'react';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { ForgotPasswordAPI } from '../apis/user/ForgotPasswordAPI';

type ForgotPasswordForm = {
    email: string;
};

function ForgotPasswordPage() {
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (data: ForgotPasswordForm) => {
        try {
            const response = await ForgotPasswordAPI(data);

            if (response.status === 'success') {
                setMessage('📧 A reset link has been sent to your email.');
            } else {
                setMessage(`❌ ${response.message || 'Failed to send email.'}`);
            }
        } catch (err) {
            setMessage('❌ An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <ForgotPasswordForm onSubmit={handleForgotPassword} message={message} />
        </div>
    );
}

export default ForgotPasswordPage;
