import { getToken } from "../../utils/getToken";

type RegisterFormInputs = {
    name: string;
    avatar: string;
    alias: string;
    parentId: string;
    language: string;
    role: string;
};
export const ChildRegistrationAPI = async (data: RegisterFormInputs) => {
    try {
        console.log(data, "data from input")
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/child`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            return error
        };
    } catch (e) {
        throw e;
    }
}