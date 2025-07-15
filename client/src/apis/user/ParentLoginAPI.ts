type LoginFormInputs = {
    email: string;
    password: string;
};

export const ParentLoginAPI = async (data: LoginFormInputs) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/parent-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result)
            localStorage.setItem('parentToken', result.data);
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Parent login failed');
        }
    } catch (e) {
        console.error('❌ Parent login API error:', e);
        throw e;
    }
};
