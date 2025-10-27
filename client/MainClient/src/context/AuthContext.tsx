import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const values = { isAuth, setIsAuth }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}