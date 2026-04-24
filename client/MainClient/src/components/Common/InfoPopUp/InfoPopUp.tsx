import { useEffect, useState } from 'react';
import icon from '../../../assets/images/icon.png'
import { motion, AnimatePresence } from 'framer-motion'

interface popUpProps {
    message: string,
}

export function InfoPopUp({ message }: popUpProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-8 right-8 z-100 flex items-center w-full max-w-[350px] bg-white shadow-custom rounded-xl border border-gray-200 p-4 overflow-hidden"
                >
                    <div className='flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4'>
                        <img width={32} height={32} src={icon} alt="Notification Icon" className="object-contain invert brightness-0" />
                    </div>

                    <div className='flex-1 min-w-0'>
                        <p className='text-sm text-slate-600 font-medium leading-tight line-clamp-2'>
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="ml-2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-blue-600"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

