import React, { useState } from 'react'
import MySuggestions from '../../components/ProfileComponents/MySuggestions/MySuggestions'
import MyDayOffs from '../../components/ProfileComponents/MyDayOffs/MyDayOffs'

function ProfilePage() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div>
            <div className='container mx-auto mt-10 grid gap-2 grid-cols-10 flex justify-center h-[150px]'>
                <div className=' col-span-1 bg-white rounded-full shadow-lg flex justify-center items-center border '>
                    <div className='border rounded-full size-32'></div>
                </div>
                <div className='col-span-8 bg-white rounded-lg shadow-lg border'></div>
                <div className='col-span-1 bg-white rounded-lg shadow-lg border'></div>
            </div>

            <div className='container mx-auto my-3 flex justify-center grid grid-cols-10 gap-2'>
                <div className='col-span-1 grid bg-white rounded-lg shadow-lg border h-[150px]'>
                    <div>
                        <button className={`p-1 text-gray-700 text-lg rounded-t-lg h-full w-full ${activeTab === 0 ? "bg-sky-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(0)} >Days Off</button>
                    </div>
                    <div >
                        <button className={`p-1 text-gray-700 text-lg h-full w-full ${activeTab === 1 ? "bg-indigo-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(1)} >Suggestions</button>
                    </div>
                    <div>
                        <button className={`p-1 text-gray-700 text-lg h-full rounded-b-lg w-full ${activeTab === 2 ? "bg-orange-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(2)} >Settings</button>
                    </div>
                </div>
                <div className=' h-[500px] col-span-9'>
                    {activeTab === 0 && <div> <MyDayOffs /></div>}
                    {activeTab === 1 && <div><MySuggestions /></div>}
                    {activeTab === 2 && <div>Tab 3 İçeriği</div>}

                </div>
            </div>

        </div>


    )
}

export default ProfilePage
