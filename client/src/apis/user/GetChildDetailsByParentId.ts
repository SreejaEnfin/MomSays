import { getParentToken } from "../../utils/getToken";

export const GetChildDetailsByParentId = async (parentId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/parent/children/${parentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`
            },
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result, "result from GetChildDetailsByParentId");
            return result.data;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch child details');
        }
    }
    catch (e) {
        throw e;
    }
}