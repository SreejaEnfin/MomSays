import { getParentToken } from "../../utils/getToken";

export const DeleteVoiceFeedbackAPI = async (data: any) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/voice-uploader`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`
            },
            body: JSON.stringify({
                parentId: data?.parentId,
                scenarioCode: data?.scenarioCode,
            }),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Voice delete request failed');
        }
    } catch (e) {
        throw e;
    }
}