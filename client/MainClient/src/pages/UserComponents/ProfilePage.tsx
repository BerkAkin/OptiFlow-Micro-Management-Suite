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
        <div className='container mx-auto px-4 py-10'>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

            <div className='bg-white rounded-xl shadow-custom border border-gray-200 p-6 flex items-center gap-8'>

                <div className="relative">
                    <div
                        onClick={handleImageClick}
                        className={`size-28 rounded-lg shadow-lg flex justify-center items-center border-4 border-white overflow-hidden relative cursor-pointer transition hover:scale-105 ${isPendingPicture ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {isLoading ? (
                            <div className="size-full bg-slate-50 animate-pulse" />
                        ) : (
                            <img
                                src={profileImgUrl || "/default-avatar.png"}
                                alt="Profile"
                                className="size-full object-cover"
                            />
                        )}


                        {isPendingPicture && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                                <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex-1 flex flex-col md:flex-row justify-between items-center w-full gap-6'>
                    <div className="text-center md:text-left">
                        <h1 className='text-2xl font-bold text-slate-800 capitalize'>{userInfo.username}</h1>
                        <p className='text-slate-400 font-medium'>{userInfo.email}</p>
                    </div>

                    <div className='h-px w-12 bg-gray-100 md:h-12 md:w-px hidden md:block' />

                    <div className="text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border-gray-200 border rounded-full mb-2">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{userInfo.department}</span>
                        </div>
                        <p className='text-3xl font-extrabold text-slate-800 tracking-tight capitalize leading-none'>
                            {userInfo.company}
                        </p>
                    </div>

                    <button
                        type='button'
                        onClick={handleChangePassword}
                        className='px-5 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-bold rounded-xl transition active:scale-95 cursor-pointer'
                    >
                        Change Password
                    </button>
                </div>
            </div>

            <div className='mt-8 grid grid-cols-12 gap-8'>
                <div className='col-span-2'>
                    <Settings />
                </div>
                <div className='col-span-10'>
                    <MyDayOffs />
                </div>
            </div>

            {isChange && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 backdrop-blur-xs">
                    <UpdatePasswordPopUp handleChange={handleChangePassword} />
                </div>
            )}
        </div>
    );
}

export default ProfilePage;