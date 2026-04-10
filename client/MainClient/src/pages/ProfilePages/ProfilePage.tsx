import MyDayOffs from '../../components/ProfileComponents/MyDayOffs/MyDayOffs'
import Settings from '../../components/ProfileComponents/Settings/Settings';
import { useAuthContext } from '../../context/AuthContext'

function ProfilePage() {
    const { userInfo } = useAuthContext();

    return (
        <div className='container mx-auto my-10'>
            <div className='mx-auto grid gap-6 grid-cols-10 flex justify-center h-[90px]'>
                <div className='col-span-1 flex justify-center items-center'>
                    <div className='bg-white rounded-full shadow-custom flex justify-center items-center border border-gray-200 size-20 '>IMAGE</div>
                </div>

                <div className='col-span-8 bg-white rounded-lg shadow-custom border border-gray-200 grid grid-cols-12 gap-6'>
                    <div className='col-span-3 flex-col flex items-center justify-center border-e border-gray-100'>
                        <p className='text-gray-600 text-2xl capitalize'>{userInfo.username}</p>
                        <p className='text-gray-400 text-lg'>{userInfo.email}</p>
                    </div>
                    <div className='col-span-9 flex-col flex items-center justify-center'>
                        <p className='text-gray-600 text-4xl tracking-[4px] capitalize'>{userInfo.company}<span className='tracking-tight text-lg align-[20px]'>{userInfo.department}</span></p>
                    </div>
                </div>


                <div className='col-span-1 bg-white rounded-lg shadow-custom border border-gray-200 hover:scale-[105%] hover:border-sky-400 transition-all '>
                    <button className='text-gray-600 text-lg size-full cursor-pointer'>Change Password</button>
                </div>
            </div>

            <div className='mx-auto my-6 flex justify-center grid grid-cols-10 gap-6'>
                <div className=' h-[500px] col-span-1'>
                    <Settings />
                </div>
                <div className=' h-[500px] col-span-9'>
                    <MyDayOffs />
                </div>
            </div>

        </div>


    )
}

export default ProfilePage
