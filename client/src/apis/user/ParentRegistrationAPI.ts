type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    role: string;
};
export const handleParentRegistrationAPI = async (data: RegisterFormInputs) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/parent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
}