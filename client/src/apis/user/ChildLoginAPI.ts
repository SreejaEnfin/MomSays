import { jwtDecode } from "jwt-decode";
import type { DecodedTokenType } from "../../types/DecodedToken";
import type { ChildLoginForm } from "../../types/ChildLoginType";

export const ChildLoginAPI = async (data: ChildLoginForm) => {
    try {
        data.role = 'child';
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/child-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(response, "response from child login API");
        if (response.ok) {
            const result = await response.json();
            sessionStorage.setItem('childToken', result.data);
            const decoded: DecodedTokenType = jwtDecode(result.data);
            const testResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-set/today/${decoded.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${result.data}`,
                }
            })
            console.log(testResponse, "testResponse");
            if (testResponse.ok) {
                const testResult = await testResponse.json();
                if (testResult.data && testResult.data.length > 0) {
                    decoded.testAvailable = true;
                    decoded.testId = testResult.data[0].id;
                } else {
                    decoded.testAvailable = false;
                }
                localStorage.setItem('loggedInChild', JSON.stringify(decoded));
                return result;
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Child login failed');
            }
        }
    } catch (e) {
        throw e;
    }

}