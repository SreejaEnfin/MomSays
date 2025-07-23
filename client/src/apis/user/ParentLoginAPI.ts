import { jwtDecode } from 'jwt-decode';
type LoginFormInputs = {
    email: string;
    password: string;
};

type DecodedTokenType = {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    name: string;
};

export const ParentLoginAPI = async (data: LoginFormInputs) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/parent-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            sessionStorage.setItem('parentToken', result.data);
            const decoded: DecodedTokenType = jwtDecode(result.data);
            localStorage.setItem('parentData', JSON.stringify(decoded));
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Parent login failed');
        }
    } catch (e) {
        console.error('❌ Parent login API error:', e);
        throw e;
    }
};
