import { getParentToken } from "../../utils/getToken";

export const UploadVoiceFeedbackAPI = async (formData: any, scenarioCode: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/voice-uploader/${scenarioCode}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${getParentToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        return response.json();
    } catch (e) {
        throw e
    }
}