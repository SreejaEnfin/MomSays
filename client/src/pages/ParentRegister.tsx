import { useState } from 'react';
import { handleParentRegistrationAPI } from '../apis/user/ParentRegistrationAPI';
import ParentRegisterForm from '../components/forms/ParentRegisterForm';
import StatusModal from '../components/common/StatusModal';
import { useNavigate } from 'react-router-dom';

type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
};

export default function ParentRegister() {
    const [showModal, setShowModal] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(true);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleParentRegistration = async (data: RegisterFormInputs) => {
        try {
            const parentData = {
                ...data,
                role: 'parent'
            }
            const response = await handleParentRegistrationAPI(parentData);
            console.log(response);
            if (response.status === 'success') {
                setModalMessage('Registration successful. You can now log in.');
                setModalSuccess(true);
                setShowModal(true);
            } else {
                setModalMessage(response.message || 'Registration failed.');
                setModalSuccess(false);
                setShowModal(true);
            }
        } catch (e) {
            setModalMessage('An unexpected error occurred. Please try again.');
            setModalSuccess(false);
            setShowModal(true);
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">Parent Registration</h2>
            <ParentRegisterForm
                onSubmit={handleParentRegistration}
            />

            <StatusModal
                show={showModal}
                success={modalSuccess}
                message={modalMessage}
                buttonLabel={modalSuccess ? 'Go to Sign In' : 'Close'}
                onAction={() => {
                    setShowModal(false);
                    if (modalSuccess) navigate('/parent-login');
                }}
            />
        </div>
    );
}
