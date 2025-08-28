import { getParentToken } from "../../utils/getToken";

export const GetQuestionsBasedonCategoryId = async (categoryIds: string[]) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions/by-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`,
            },
            body: JSON.stringify({ categoryIds }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch questions");
        }

        return await response.json();
    } catch (e) {
        throw e;
    }
}