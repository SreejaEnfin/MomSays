import { useNavigate } from 'react-router-dom';
import ParentLoginForm from '../components/forms/ParentLoginForm';
import { ParentLoginAPI } from '../apis/user/ParentLoginAPI';

type LoginFormInputs = {
    email: string;
    password: string;
};

function ParentLoginPage() {
    const navigate = useNavigate();

    const handleParentLogin = async (data: LoginFormInputs) => {
        const response = await ParentLoginAPI(data);
        if (response.status === 'success') {
            navigate('/parent-dashboard');
        } else {
            console.error('Login failed:', response.message);
        }
    };

    return (
        <ParentLoginForm onSubmit={handleParentLogin} />
    );
}

export default ParentLoginPage;
