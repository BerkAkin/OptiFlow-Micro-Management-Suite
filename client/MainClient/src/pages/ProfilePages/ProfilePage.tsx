import React, { useState } from 'react'
import MySuggestions from '../../components/ProfileComponents/MySuggestions/MySuggestions'
import MyDayOffs from '../../components/ProfileComponents/MyDayOffs/MyDayOffs'
import Settings from '../../components/ProfileComponents/Settings/Settings'

function ProfilePage() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className='container mx-auto my-10'>
            <div className='mx-auto grid gap-6 grid-cols-10 flex justify-center h-[130px] '>
                <div className=' col-span-1 bg-white rounded-full shadow-custom flex justify-center items-center border border-gray-200 '>
                    <div className='border border-gray-200 rounded-full size-32 flex justify-center items-center'>IMAGE</div>
                </div>

                <div className='col-span-8 bg-white rounded-lg shadow-custom border border-gray-200 grid grid-cols-4 gap-6'>
                    <div className='col-span-1 flex items-center justify-center'>
                        <p className='text-gray-600 text-5xl '>BERK AKIN</p>
                    </div>
                    <div className='col-span-3 grid grid-cols-2'>
                        <div className='grid'>
                            <div className='flex items-center'> <p className='text-gray-600 text-lg'>Company: <span className='text-gray-400'>MicroUsers</span></p></div>
                            <div className='flex items-center'> <p className='text-gray-600 text-lg'>Department: <span className='text-gray-400'>Administration</span></p></div>
                            <div className='flex items-center'> <p className='text-gray-600 text-lg'>Role: <span className='text-gray-400'>SuperUser</span></p></div>
                        </div>
                        <div className='grid'>

                            <div className='flex items-center'> <p className='text-gray-600 text-lg'>Email: <span className='text-gray-400'>berkakin@mail.com</span></p></div>
                            <div className='flex items-center'> <p className='text-gray-600 text-lg'>Change Password:<span className='text-gray-400'>*****</span></p></div>
                            <div className='flex items-center'></div>
                        </div>
                    </div>
                </div>


                <div className='col-span-1 bg-white rounded-lg shadow-custom border border-gray-200 '>
                    <div className='h-[20%]'>
                        <p className={`text-lg rounded-t-lg text-center rounded-b-sm text-white bg-neutral-400 font-rubik`}>Last Day Online</p>
                    </div>

                    <div className='h-[75%] flex items-center justify-center'>
                        <p className={`text-2xl text-gray-600 font-rubik`}>25.12.2025</p>
                    </div>

                </div>
            </div>

            <div className='mx-auto my-6 flex justify-center grid grid-cols-10 gap-6'>
                <div className='col-span-1 grid bg-white rounded-lg shadow-custom border border-gray-200 h-[150px]'>
                    <div>
                        <button className={`cursor-pointer p-1 text-gray-700 text-lg rounded-t-lg h-full w-full ${activeTab === 0 ? "bg-sky-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(0)} >Days Off</button>
                    </div>
                    <div >
                        <button className={`cursor-pointer p-1 text-gray-700 text-lg h-full w-full ${activeTab === 1 ? "bg-indigo-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(1)} >Suggestions</button>
                    </div>
                    <div>
                        <button className={`cursor-pointer p-1 text-gray-700 text-lg h-full rounded-b-lg w-full ${activeTab === 2 ? "bg-orange-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(2)} >Settings</button>
                    </div>
                </div>
                <div className=' h-[500px] col-span-9'>
                    {activeTab === 0 && <div> <MyDayOffs /></div>}
                    {activeTab === 1 && <div><MySuggestions /></div>}
                    {activeTab === 2 && <div><Settings /></div>}

                </div>
            </div>

        </div>


    )
}

export default ProfilePage
