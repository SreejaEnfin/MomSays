import { getChildToken } from "../../utils/getToken";

export const getTestQuestionsAPI = async (testId: string) => {
    try {
        console.log(testId, "testId from params in API");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-set/by-child?testId=${testId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getChildToken() || ''}`
            }
        })
        if (!response.ok) {
            throw new Error("Failed to fetch test questions");
        }
        const data = await response.json();
        return data.data;
    } catch (e) {
        throw new Error("Failed to fetch test questions");
    }
}