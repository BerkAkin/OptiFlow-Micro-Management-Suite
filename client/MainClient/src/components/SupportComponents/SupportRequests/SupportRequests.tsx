import { Link, Outlet } from 'react-router'
import { useMarkAsClosed, useSupportRequests } from '../../../hooks/SupportHooks/UseSupport';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { useState } from 'react';
import { useToatsContext } from '../../../context/ToastContext';
import RoleBasedGuard from '../../RoleBasedGuard/RoleBasedGuard';



function SupportRequests() {

    const { data, isLoading, error } = useSupportRequests();
    const [outletContext, setOutletContext] = useState<{ id: number, isClosed: boolean } | null>(null);
    const { showToast } = useToatsContext();

    const mutation = useMarkAsClosed();
    const handleMarkAsClosed = (id: number) => {
        mutation.mutate(id, {
            onSuccess: () => {
                showToast("İstek başarıyla kapatıldı")
            },
            onError: (error: any) => {
                showToast("Bir hata oluştu istek kapatılamadı");
                console.log(error);
            }
        });
    }


    if (isLoading) return <Spinner />
    if (error || !data) return <ErrorMessage />


    return (
        <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3 border border-gray-200 bg-white rounded-lg shadow-custom'>
                <div className='h-[10%] text-start flex justify-start'>
                    <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4 `}>Support Requests</p>
                </div>
                <div className='overflow-y-auto overflow-x-hidden h-[400px] px-1 py-5'>
                    {
                        data.map((item: any) => (

                            <Link onClick={() => setOutletContext({ id: item.id, isClosed: item.isClosed })} key={item.Id} to={`request\\${item.id}\\messages`} className='cursor-pointer'>
                                <div className='grid grid-cols-8 h-[30%] border rounded-md shadow-sm border-gray-200 my-2 mx-2 hover:bg-gray-50'>
                                    <div className='col-span-8 mt-2 grid grid-cols-2'>
                                        <div className='flex items-center justify-start px-2 text-start flex items-center '>
                                            <p className='text-gray-400'>{item.isClosed ? "Closed" : "Open"}</p>

                                        </div>
                                        <div className='flex items-center justify-end text-start flex items-center '>
                                            {item.isClosed ? "" :
                                                <RoleBasedGuard allowedDepartments={["HR"]}>
                                                    <button onClick={() => handleMarkAsClosed(item.id)} className='border-none outline-none bg-red-500 hover:bg-red-400 transition-all cursor-pointer text-xs mx-2 p-1 rounded text-white'>
                                                        Close
                                                    </button>
                                                </RoleBasedGuard>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-span-8 flex items-center justify-between px-2 text-start flex items-center'>
                                        <p className='text-gray-600'><span className='font-bold'>Category: </span>{item.category}</p>
                                    </div>
                                    <div className='col-span-8 flex items-center justify-start px-2 text-start flex items-center'>
                                        <p className='text-gray-600 '><span className='font-bold'>Employee: </span> {item.userName}</p>
                                    </div>
                                    <div className='col-span-8 flex items-center justify-end px-2 text-start flex items-center'>
                                        <p className='text-gray-400'>{item.createdAt}</p>
                                    </div>

                                </div>
                            </Link>

                        ))
                    }
                </div>


            </div>
            <div className='col-span-9 border border-gray-200 bg-white rounded-lg shadow-custom h-[460px]'>
                <Outlet context={{ isClosed: outletContext?.isClosed }} />
            </div>

        </div>
    )
}

export default SupportRequests
