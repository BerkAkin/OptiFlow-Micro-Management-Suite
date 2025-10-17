import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';


function ModalContainer() {

    const { modalType } = useContext(ModalContext);

    return (
        <>
            <div className=' w-[100%] h-full bg-black/40 absolute z-10 flex items-center justify-center backdrop-blur-sm '>
                {modalType == "login" ? <LoginModal /> : modalType == "register" ? <RegisterModal /> : ""}
            </div>
        </>
    )
}

export default ModalContainer
