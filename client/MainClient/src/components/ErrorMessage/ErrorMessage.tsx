import React from 'react'
import styles from './styles.module.css'

function ErrorMessage() {
    return (
        <>
            <div className='h-full w-full'>
                <div className='flex relative justify-center items-end h-[60%]'>
                    <div className={`absolute h-24 w-1 rotate-[45deg] rounded-full  ${styles.line}`}></div>
                    <div className={`absolute h-24 w-1 rotate-[-45deg] rounded-full  ${styles.line}`}></div>
                </div>
                <div className='h-[40%] flex justify-center'>
                    <div className={`${styles.glowText}`}>Error</div>
                </div>


            </div>

        </>

    )
}

export default ErrorMessage
