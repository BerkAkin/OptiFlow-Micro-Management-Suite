import React from 'react'
import styles from './styles.module.css'

function ErrorMessage() {
    return (
        <div className='h-full min-h-[300px] w-full flex flex-col justify-center items-center bg-transparent'>
            <div className='relative flex justify-center items-center h-32 w-32 mb-8'>
                <div className={`absolute h-20 w-1.5 rotate-[45deg] rounded-full ${styles.line}`}></div>
                <div className={`absolute h-20 w-1.5 rotate-[-45deg] rounded-full ${styles.line}`}></div>
            </div>

            <div className='flex flex-col items-center gap-2'>
                <h3 className={`${styles.glowText} text-2xl font-bold tracking-widest uppercase`}>
                    Error
                </h3>
                <p className="text-gray-400 text-sm font-medium px-6 text-center max-w-xs">
                    There was a problem loading the data. Please check your connection.
                </p>
            </div>
        </div>
    )
}

export default ErrorMessage;