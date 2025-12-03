import { Link, Outlet } from 'react-router'


const users = [
    { id: 0, name: "Berk Akın", img: "Image", latestMessage: "This is a message from Berk and it's so long...", date: "25.11.2025" },
    { id: 1, name: "Berk Akın", img: "Image", latestMessage: "This is a message", date: "25.11.2025" },
    { id: 2, name: "Berk Akın", img: "Image", latestMessage: "This is a message", date: "25.11.2025" },
]

function SupportChat() {
    return (
        <div className='h-full grid grid-cols-12 gap-6'>
            <div className='col-span-3 border border-gray-200 bg-white rounded-lg shadow-custom'>
                <div className='flex justify-center mb-6'>
                    <p className='px-6 rounded-b-md bg-lime-600 text-xl text-white'>Employees</p>
                </div>
                <div className='overflow-y-auto overflow-x-hidden h-[350px]'>
                    {
                        users.map((item) => (
                            <Link to={`chat/${item.id}`} className='cursor-pointer'>
                                <div className='grid grid-cols-8  border rounded-md shadow-sm border-gray-200 my-2 mx-4 hover:bg-gray-50'>

                                    <div className='col-span-2 flex items-center justify-center flex justify-center p-1 border-r border-gray-200'>
                                        <img className='border border-gray-400 rounded-full' width={60} height={60} src="" alt="" />
                                    </div>

                                    <div className='col-span-2 flex items-center justify-center text-start flex items-center'>
                                        <p className=' text-gray-600'>{item.name}</p>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-center overflow-hidden text-start items-center flex'>

                                        <p className="text-gray-400">278</p>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-center text-end'>
                                        <p className="text-gray-400">4.8 ★</p>
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
