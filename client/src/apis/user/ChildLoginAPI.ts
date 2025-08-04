import { jwtDecode } from "jwt-decode";
import type { DecodedTokenType } from "../../types/DecodedToken";
import type { ChildLoginForm } from "../../types/ChildLoginType";

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
        throw e;
    }

}