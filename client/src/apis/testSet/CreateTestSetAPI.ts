import { getParentToken } from "../../utils/getToken";

export const CreateTestSetAPI = async (testSetData: any) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-set`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`
            },
            body: JSON.stringify(testSetData),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create test set');
        }
    } catch (e) {
        throw e;
    }
}