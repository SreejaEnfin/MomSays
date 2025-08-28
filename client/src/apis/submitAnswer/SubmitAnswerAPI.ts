export const SubmitAnswerAPI = async (answers: Record<string, any>) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/submit-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        console.log("Response from SubmitAnswerAPI:", response.json);
        return await response.json();
    } catch (error) {
        console.error("Failed to submit answers:", error);
        throw error;
    }
}