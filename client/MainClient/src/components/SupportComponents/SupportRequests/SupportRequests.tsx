import { Link, Outlet } from 'react-router'
import { useSupportRequests } from '../../../hooks/SupportHooks/UseSupport';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';


function SupportRequests() {

    const { data, isLoading, error } = useSupportRequests();

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

                            <Link key={item.Id} to={`request\\${item.id}\\messages`} className='cursor-pointer'>
                                <div className='grid grid-cols-8 h-[25%] border rounded-md shadow-sm border-gray-200 my-2 mx-2 hover:bg-gray-50'>
                                    <div className='col-span-8 flex items-center justify-between px-2 text-start flex items-center'>
                                        <p className='text-gray-600'><span className='font-bold'>Category: </span>{item.category}</p>
                                        <p className='text-gray-400'>{item.isClosed ? "Closed" : "Open"}</p>
                                    </div>
                                    <div className='col-span-8 flex items-center justify-start px-2 text-start flex items-center'>
                                        <p className='text-gray-500'>Employee: {item.userName}</p>
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
            <div className='col-span-9'>
                <div className='col-span-4'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default SupportRequests
