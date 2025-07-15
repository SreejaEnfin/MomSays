import { useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { useState } from 'react';
import { PasswordRestAPI } from '../apis/user/PasswordRestAPI';

export default function PasswordReset() {
    const { token } = useParams();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const handlePasswordReset = async (newPassword: string) => {
        const response = await PasswordRestAPI({ token: token || '', password: newPassword });
        if (response.status !== 'success') {
            console.error('Password reset failed:', response.message);
            setMessage(response.message || 'Failed to reset password.');
            return;
        } else {
            setMessage("Password reset successfull")
            setSuccess(true);
        }
    };

    return <ResetPasswordForm onSubmit={handlePasswordReset} success={success} message={message} />;
}
