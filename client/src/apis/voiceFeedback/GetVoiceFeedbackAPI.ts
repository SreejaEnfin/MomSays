import { getToken } from "../../utils/getToken";

export const GetVoiceFeedbackAPI = async (parentId: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/voice-uploader/voices?parentId=${parentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch uploaded voice clips');
        }

        return await response.json();
    } catch (e) {
        throw e
    }

};
