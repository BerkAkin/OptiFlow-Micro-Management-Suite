import { useState } from 'react'
import MyDayOffs from '../../components/ProfileComponents/MyDayOffs/MyDayOffs'
import Settings from '../../components/ProfileComponents/Settings/Settings'
import { useAuthContext } from '../../context/AuthContext'

function ProfilePage() {
    const [activeTab, setActiveTab] = useState(0)
    const { userInfo } = useAuthContext();

    return (
        <div className='container mx-auto my-10'>
            <div className='mx-auto grid gap-6 grid-cols-10 flex justify-center h-[130px] '>
                <div className=' col-span-1 bg-white rounded-full shadow-custom flex justify-center items-center border border-gray-200 '>
                    <div className='border border-gray-200 rounded-full size-32 flex justify-center items-center'>IMAGE</div>
                </div>

                <div className='col-span-8 bg-white rounded-lg shadow-custom border border-gray-200 grid grid-cols-4 gap-6'>
                    <div className='col-span-1  flex-col flex items-center justify-center'>
                        <p className='text-gray-600 text-5xl capitalize'>{userInfo.username}</p>
                        <p className='text-gray-400 text-lg'>{userInfo.email}</p>
                    </div>
                    <div className='col-span-3 grid'>
                        <div className='flex items-center capitalize'>
                            <p className='text-gray-600 text-lg'>Company: <span className='text-gray-400'>{userInfo.company}</span></p>
                        </div>
                        <div className='flex items-center capitalize'>
                            <p className='text-gray-600 text-lg'>Role: <span className='text-gray-400'>{userInfo.department}</span></p>
                        </div>
                    </div>
                </div>


                <div className='col-span-1 bg-white rounded-lg shadow-custom border border-gray-200 hover:scale-[105%] hover:border-sky-400 transition-all '>
                    <button className='text-gray-600 text-lg size-full cursor-pointer'>Change Password</button>
                </div>
            </div>

            <div className='mx-auto my-6 flex justify-center grid grid-cols-10 gap-6'>
                <div className='col-span-1 grid bg-white rounded-lg shadow-custom border border-gray-200 h-[150px]'>
                    <div>
                        <button className={`cursor-pointer p-1 text-gray-700 text-lg rounded-t-lg h-full w-full ${activeTab === 0 ? "bg-sky-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(0)} >Days Off</button>
                    </div>
                    <div>
                        <button className={`cursor-pointer p-1 text-gray-700 text-lg h-full rounded-b-lg w-full ${activeTab === 2 ? "bg-orange-400 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab(2)} >Settings</button>
                    </div>
                </div>
                <div className=' h-[500px] col-span-9'>
                    {activeTab === 0 && <div> <MyDayOffs /></div>}
                    {activeTab === 2 && <div><Settings /></div>}

                </div>
            </div>

        </div>


    )
}

export default ProfilePage
