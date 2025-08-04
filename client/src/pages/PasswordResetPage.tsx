import { useNavigate, useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { useState } from 'react';
import { PasswordRestAPI } from '../apis/user/PasswordRestAPI';
import StatusModal from '../components/common/StatusModal';

export default function PasswordReset() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(true);
    const [modalMessage, setModalMessage] = useState('');

    const handlePasswordReset = async (newPassword: string) => {
        try {
            const response = await PasswordRestAPI({ token: token || '', password: newPassword });
            if (response.status !== 'success') {
                setModalMessage(response.message || 'Failed to reset password.');
                setModalSuccess(false);
                setShowModal(true);
                return;
            } else {
                setModalMessage("Password reset successfull")
                setShowModal(true);
                setModalSuccess(true);
            }
        } catch (e) {
            setModalMessage('An unexpected error occurred. Please try again.');
            setModalSuccess(false);
            setShowModal(true);
            return;
        }

    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>

            < ResetPasswordForm onSubmit={handlePasswordReset} />

            <StatusModal success={modalSuccess} message={modalMessage} show={showModal} buttonLabel={modalSuccess ? 'Go to Sign In' : 'Close'} onAction={() => {
                setShowModal(false);
                if (modalSuccess) navigate('/parent-login');
            }
            } />
        </div>

    )


}
