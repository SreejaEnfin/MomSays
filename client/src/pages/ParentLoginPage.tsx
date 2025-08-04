import { useNavigate } from 'react-router-dom';
import ParentLoginForm from '../components/forms/ParentLoginForm';
import { ParentLoginAPI } from '../apis/user/ParentLoginAPI';
import { useParent } from '../contexts/ParentContext';
import type { ParentLoginType } from '../types/ParentLoginType';

function ParentLoginPage() {
    const navigate = useNavigate();
    const { setParent } = useParent();

    const handleParentLogin = async (data: ParentLoginType) => {
        try {
            const response = await ParentLoginAPI(data);
            if (response?.result?.status === 'success') {
                setParent(response?.data)
                navigate('/parent-dashboard');
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <ParentLoginForm onSubmit={handleParentLogin} />
    );
}

export default ParentLoginPage;
