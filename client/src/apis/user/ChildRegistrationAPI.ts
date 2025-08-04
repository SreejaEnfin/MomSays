import type { ChildRegisteration } from "../../types/ChildRegistration";
import { getToken } from "../../utils/getToken";

export const ChildRegistrationAPI = async (data: ChildRegisteration) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/child`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            return error
        };
    } catch (e) {
        throw e;
    }
}