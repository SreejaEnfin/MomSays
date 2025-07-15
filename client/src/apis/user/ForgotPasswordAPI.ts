type ForgotPasswordForm = {
    email: string;
};

export const ForgotPasswordAPI = async (data: ForgotPasswordForm) => {
    try {
        const response = await fetch(`${import.meta.env.BACKEND_URL}/user/parent/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.email })
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Forgot password request failed');
        }
    } catch (e) {
        console.error('❌ Forgot password API error:', e);
        throw e;
    }
}