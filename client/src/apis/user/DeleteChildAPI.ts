import type { Child } from "../../types/Child";
import { getToken } from "../../utils/getToken";

export const DeleteChildAPI = async (child: Child) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/child/${child.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        });
        console.log(response);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Child delete request failed');
        }
    } catch (e) {
        console.error("Delete Child API error", e);
        throw e;
    }
}