
import { useEffect, useState } from 'react';
import icon from '../../assets/icon.png'
import { motion } from 'framer-motion'

interface popUpProps {
    message: string,
}

function InfoPopUp({ message }: popUpProps) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!isVisible) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`grid grid-cols-10 fixed bottom-10 right-5 z-10 w-96 h-20 bg-white shadow-2xl rounded-lg border border-gray-300`}>

            <div className='col-span-2 flex items-center justify-center'>
                <img width={50} src={icon}></img>
            </div>
            <div className='col-span-8 w-[90%] flex justify-start items-center truncate'>
                <p className='text-sm text-slate-600'>{message}</p>
            </div>
        </motion.div>
    )
}

export default InfoPopUp
