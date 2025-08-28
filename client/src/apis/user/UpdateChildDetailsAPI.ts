import type { Child } from "../../types/Child";
import { getParentToken } from "../../utils/getToken";

export const UpdateChildDetailsAPI = async (data: Child) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/child/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Forgot password request failed');
        }
    } catch (e) {
        throw e;
    }

}