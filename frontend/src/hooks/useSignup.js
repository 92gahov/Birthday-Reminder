import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

export const useSignup = () => {

    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            const user = {
                name: json.name,
                token: json.token
            }
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        }
    };
    return { signup, isLoading, error };
};