import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

interface UserInfoShape {
    username: string,
    email: string,
    company: string,
    department: string,
    profilePicture: string,
    permissions: string[]
}

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoShape | null>(null);

    const handleLoginState = (token: string) => {
        try {
            const decoded = jwtDecode<UserInfoShape>(token);
            setUserInfo({ profilePicture: decoded.profilePicture, username: decoded.username, email: decoded.email, company: decoded.company, department: decoded.department, permissions: decoded.permissions });
            setIsAuth(true);
            localStorage.setItem("AccessToken", token);
        } catch (error) {
            setIsAuth(false);
            console.error("Anahtar açma hatası");
        }
    }

    const handleLogoutState = () => {
        setIsAuth(false);
        setUserInfo(null);
        localStorage.removeItem("AccessToken");
    }


    const values = { isAuth, handleLogoutState, userInfo, handleLoginState }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}