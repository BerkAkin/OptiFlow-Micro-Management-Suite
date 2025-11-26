import React from 'react'
import HelpChat from '../../components/HelpComponents/HelpChat/HelpChat'

function HelpPage() {
    return (
        <div className='container my-10 mx-auto'>
            <div className='h-[450px]'>
                <HelpChat />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white h-[400px] col-span-3 shadow-custom border border-gray-200 rounded-lg'>
                </div>
                <div className='bg-white h-[400px] col-span-7 shadow-custom border border-gray-200 rounded-lg '>
                </div>

            </div>
        </div>
    )
}

export default HelpPage
