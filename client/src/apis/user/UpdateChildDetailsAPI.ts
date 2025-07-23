import type { Child } from "../../types/Child";
import { getToken } from "../../utils/getToken";

export const UpdateChildDetailsAPI = async (data: Child) => {
    try {
        console.log(data, "data")
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/child/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
        })
        console.log(response, "response from edit ");
        if (response.ok) {
            const result = await response.json();
            console.log(result, "result from edit---------------")
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Forgot password request failed');
        }
    } catch (e) {
        console.error('❌ Forgot password API error:', e);
        throw e;
    }

}