import { createContext, useState } from 'react'


export const ModalContext = createContext<any>("");

const ModalContextProvider = ({ children }: any) => {

    const [isModal, setIsModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"login" | "register" | "">("");

    const values = { isModal, modalType, setIsModal, setModalType }
    return (
        < ModalContext.Provider value={values} >
            {children}
        </ ModalContext.Provider >
    )
}


export default ModalContextProvider
