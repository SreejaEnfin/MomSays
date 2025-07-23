import { jwtDecode } from "jwt-decode";

type ChildLoginForm = {
    alias: string;
};

type DecodedTokenType = {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
    parentId: string;
    alias: string;
}

export const ChildLoginAPI = async (data: ChildLoginForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/child-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            sessionStorage.setItem('childToken', result.data);
            const decoded: DecodedTokenType = jwtDecode(result.data);
            localStorage.setItem('childData', JSON.stringify(decoded));
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Child login failed');
        }
    } catch (e) {
        console.error('❌ Child login API error:', e);
        throw e;
    }

}