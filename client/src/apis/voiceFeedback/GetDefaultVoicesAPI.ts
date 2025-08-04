import { getToken } from "../../utils/getToken";

export const GetDefaultVoicesAPI = async (parentID: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/voice-uploader/voices?parent=${parentID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch default voices');
        }
        return await response.json();
    } catch (e) {
        throw e;
    }
}