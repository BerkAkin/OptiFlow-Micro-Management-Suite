import { useRef, useState } from 'react';
import MyDayOffs from '../../components/ProfileComponents/MyDayOffs/MyDayOffs'
import Settings from '../../components/ProfileComponents/Settings/Settings';
import { useAuthContext } from '../../context/AuthContext'
import { useChangeProfilePicture, useProfilePicture } from '../../hooks/ProfileHooks/UseProfile';
import UpdatePasswordPopUp from '../../components/UpdatePasswordPopUp/UpdatePasswordPopUp';

function ProfilePage() {
    const [isChange, setIsChange] = useState<boolean>(false);
    const { userInfo } = useAuthContext();
    const { data: profileImgUrl, isLoading } = useProfilePicture(userInfo.profilePicture);
    const { mutate: changeImage, isPending: isPendingPicture } = useChangeProfilePicture();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => fileInputRef.current?.click();
    const handleChangePassword = () => setIsChange(prev => !prev);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        changeImage(formData);
    };

    return (
        <div className='container mx-auto my-10'>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

            <div className='mx-auto grid gap-6 grid-cols-10 flex justify-center h-[90px]'>
                <div className='col-span-1 flex justify-center items-center'>
                    <div
                        onClick={handleImageClick}
                        className={`bg-white rounded-full shadow-custom flex justify-center items-center border border-gray-200 size-20 cursor-pointer overflow-hidden relative hover:border-sky-400 transition-all ${isPendingPicture ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <div className={`...`}>
                            {isLoading ? (
                                <div></div>
                            ) : (
                                <img
                                    src={profileImgUrl || "/default-avatar.png"}
                                    alt="Profile"
                                    className="size-full object-cover"
                                />
                            )}
                        </div>
                        {isPendingPicture && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                                <div className="size-4 border-2 border-sky-500 border-t-transparent animate-spin rounded-full"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='col-span-8 bg-white rounded-lg shadow-custom border border-gray-200 grid grid-cols-12 gap-6'>
                    <div className='col-span-3 flex-col flex items-center justify-center border-e border-gray-100'>
                        <p className='text-gray-600 text-2xl capitalize'>{userInfo.username}</p>
                        <p className='text-gray-400 text-lg'>{userInfo.email}</p>
                    </div>
                    <div className='col-span-9 flex-col flex items-center justify-center'>
                        <p className='text-gray-600 text-4xl tracking-[4px] capitalize'>
                            {userInfo.company}
                            <span className='tracking-tight text-lg align-[20px] ml-2'>{userInfo.department}</span>
                        </p>
                    </div>
                </div>

                <div className='col-span-1 bg-white rounded-lg shadow-custom border border-gray-200 hover:scale-[105%] hover:border-sky-400 transition-all '>
                    <button type='button' onClick={handleChangePassword} className='text-gray-600 text-lg size-full cursor-pointer'>Change Password</button>
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

            {
                isChange && <UpdatePasswordPopUp handleChange={handleChangePassword} />
            }
        </div>
    );
}

export default ProfilePage;