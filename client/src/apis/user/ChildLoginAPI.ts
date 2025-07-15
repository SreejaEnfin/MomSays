type ChildLoginForm = {
    alias: string;
};

export const ChildLoginAPI = async (data: ChildLoginForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/child-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('childToken', result.data);
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Child login failed');
        }
    } catch (e) {
        console.error('❌ Child login API error:', e);
        throw e;
    }

}