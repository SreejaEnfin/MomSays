import { getParentToken } from "../../utils/getToken";

export const GetCategoriesByAgeGroupAPI = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/category/by-age-group`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getParentToken()}`,
            },
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result)
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message)
        }
    } catch (e) {
        throw e
    }
}