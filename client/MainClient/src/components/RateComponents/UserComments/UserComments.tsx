

function UserComments() {

    return (
        <div className='grid grid-cols-12 gap-6 h-full rounded-sm'>

            <div className='h-[400px] col-span-2 shadow-custom rounded-lg bg-white border border-gray-200'>
                <div className='h-[10%] w-full text-center flex justify-center items-start'>
                    <p className={`text-xl text-center text-white bg-red-400 rounded-b-sm font-rubik px-6 `}>Employees</p>
                </div>

                <div className="h-[85%] p-4 overflow-y-auto">
                    {Array.from({ length: 3 }).map(item => (
                        <div className="border rounded-md shadow-sm border-gray-200  col-span-3 h-[50px] my-2">
                            <button className="cursor-pointer hover:bg-gray-100 size-full text-lg rounded-md text-gray-600 font-semibold">
                                Berk Akın
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div className='h-[400px] col-span-10 shadow-custom rounded-lg bg-white border border-gray-200 p-6'>
                <div className="h-[100%] p-4 grid grid-cols-12 gap-4 overflow-y-auto">
                    {Array.from({ length: 3 }).map(item => (
                        <div className="border  rounded-md shadow-sm border-gray-200 col-span-3 h-[160px]">
                            <div className="h-[25%] p-2"><p className="text-gray-600 text-lg font-semibold">Murat Eke</p></div>
                            <div className="h-[60%] overflow-hidden px-2">
                                <p className="text-gray-500">
                                    Bu bir yorum hemde baya uzun
                                    Bu bir yorum hemde baya uzun
                                    Bu bir yorum hemde baya uzun
                                </p>
                            </div>
                            <div className="h-[15%] px-2 grid grid-cols-2">
                                <div>
                                    <p className="text-orange-300 ">★ 5</p>
                                </div>
                                <div className="flex justify-end">
                                    <p className="text-gray-400">25.10.2025</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default UserComments
