import { getParentToken } from "../../utils/getToken";

export const MarkWelcomeMessageSeen = async (id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/mark-welcome-message-seen/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to mark welcome message as seen');
        }

        return await response.json();
    } catch (e) {
        throw e;
    }
}