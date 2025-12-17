import { Link, Outlet } from 'react-router'
import { useSupportEmployees } from '../../../hooks/SupportHooks/UseSupport';


function SupportChat() {

    const { data, isLoading, error } = useSupportEmployees();

    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    return (
        <div className='h-full grid grid-cols-12 gap-6'>
            <div className='col-span-3 border border-gray-200 bg-white rounded-lg shadow-custom'>
                <div className='h-[10%] text-start flex justify-start'>
                    <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4`}>Employees</p>
                </div>
                <div className='overflow-y-auto overflow-x-hidden h-[350px] p-2'>
                    {
                        data.map((item) => (
                            <Link to={`chat/${item.id}`} className='cursor-pointer'>
                                <div className='grid grid-cols-8  border rounded-md shadow-sm border-gray-200 my-2 mx-4 hover:bg-gray-50'>

                                    <div className='col-span-2 flex items-center justify-center flex justify-center p-1 border-r border-gray-200'>
                                        <img className='border border-gray-400 rounded-full' width={60} height={60} src="" alt="" />
                                    </div>

                                    <div className='col-span-2 flex items-center justify-center text-start flex items-center'>
                                        <p className=' text-gray-600'>{item.name}</p>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-center overflow-hidden text-start items-center flex'>

                                        <p className="text-gray-400">{item.votes}</p>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-center text-end'>
                                        <p className="text-gray-400">{item.stars} ★</p>
                                    </div>

                                </div>
                            </Link>
                        ))
                    }
                </div>


            </div>
            <div className='col-span-9'>
                <Outlet />
            </div>

        </div>
    )
}

export default SupportChat
