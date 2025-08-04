import { useNavigate } from 'react-router-dom';
import ChildLoginForm from '../components/forms/ChildLoginForm';
import { ChildLoginAPI } from '../apis/user/ChildLoginAPI';

type ChildLoginForm = {
    alias: string;
};

function ChildLoginPage() {
    const navigate = useNavigate();

    const handleChildLogin = async (data: ChildLoginForm) => {
        try {
            const response = await ChildLoginAPI(data);
            if (response.status !== 'success') {
                throw new Error(response.message || 'Login failed');
            } else {
                navigate('/child-dashboard');
            }
        } catch (error) {
            throw error
        }
    };
    return (
        <ChildLoginForm onSubmit={handleChildLogin} />
    );
}

export default ChildLoginPage;
