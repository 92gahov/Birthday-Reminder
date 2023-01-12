import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };
    return { logout };
};