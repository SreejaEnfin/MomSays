import { getToken } from "../../utils/getToken";

export const GetChildDetailsByParentId = async (parentId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/parent/children/${parentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        });
        console.log(response, "response from getChildDetailsByParentId");
        if (response.ok) {
            const result = await response.json();
            console.log(result, "result from getChildDetailsByParentId");
            return result.data;
        } else {
            const error = await response.json();
            console.error('Error fetching child details:', error);
            throw new Error(error.message || 'Failed to fetch child details');
        }
    }
    catch (e) {
        console.error('❌ GetChildDetailsByParentId API error:', e);
        throw e;
    }
}