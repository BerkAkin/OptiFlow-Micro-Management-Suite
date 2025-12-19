import { createContext, useContext, useState } from "react";
import InfoPopUp from "../components/InfoPopUp/InfoPopUp";

const ToastContext = createContext<any>(null);

export const ToastContextProvider = ({ children }: any) => {
    const [toast, setToast] = useState<{ id: number, message: string } | null>(null);

    const showToast = (message: string) => {
        setToast({ id: Date.now(), message, });
    }
    const values = { showToast }

    return (
        <ToastContext.Provider value={values}>
            {children}
            {toast && <InfoPopUp key={toast.id} message={toast.message} />}
        </ToastContext.Provider>
    )
}

export const useToatsContext = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast ToastProvider içinde kullanılmalıdır");
    return context;
}