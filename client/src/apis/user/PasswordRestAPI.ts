import type { PasswordReset } from "../../types/PasswordReset";

export const PasswordRestAPI = async (data: PasswordReset) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/parent/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data?.token, password: data?.password }),
        });

        if (response.ok) {
            return response.json();
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Password reset failed');
        }
    } catch (e) {
        throw e;
    }
}