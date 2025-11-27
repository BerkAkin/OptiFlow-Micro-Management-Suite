import { Link, Outlet } from 'react-router'


const users = [
    { id: 0, name: "Berk Akın", img: "Image", latestMessage: "This is a message from Berk and it's so long...", date: "25.11.2025" },
    { id: 1, name: "Berk Akın", img: "Image", latestMessage: "This is a message", date: "25.11.2025" },
    { id: 2, name: "Berk Akın", img: "Image", latestMessage: "This is a message", date: "25.11.2025" },
]

function HelpChat() {
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
                                <div className='grid grid-cols-8 border rounded-md shadow-sm border-gray-200 my-2 mx-4 hover:bg-gray-50'>
                                    <div className='col-span-2 flex justify-center p-1'>
                                        <img className='border border-gray-400 rounded-full' width={60} height={45} src="" alt="" />
                                    </div>
                                    <div className='col-span-6 grid '>
                                        <div className='text-start flex items-center'>
                                            <p className='px-2 pt-2 font-semibold text-gray-700 text-sm'>{item.name}</p>
                                        </div>
                                        <div className='overflow-hidden text-start items-center flex'>
                                            <p className='text-gray-600 px-2 text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                                                {item.latestMessage}</p>
                                        </div>
                                        <div className='text-end'>
                                            <p className='px-2 text-sm text-gray-400'>{item.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>


            </div>
            <div className='col-span-9 border border-gray-200 bg-white rounded-lg shadow-custom'>
                <Outlet />
            </div>
        </div>
    )
}

export default HelpChat
