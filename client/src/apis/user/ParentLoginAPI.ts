import { jwtDecode } from 'jwt-decode';
import type { DecodedTokenType } from '../../types/DecodedToken';
import type { ParentLoginType } from '../../types/ParentLoginType';

export const ParentLoginAPI = async (data: ParentLoginType) => {
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
            console.log(result, "result from parent login");
            if (result.status === 'error') {
                throw new Error(result.message || 'Parent login failed');
            }
            sessionStorage.setItem('parentToken', result.data);
            const decoded: DecodedTokenType = jwtDecode(result.data);
            localStorage.setItem('parentData', JSON.stringify(decoded));
            return {
                result: result,
                data: decoded
            }
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Parent login failed');
        }
    } catch (e) {
        throw e;
    }
};
