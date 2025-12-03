

function UserComments() {

    return (


        <div className="h-full">


            <div className="h-[425px] border rounded-md border-gray-200  p-6 grid grid-cols-12 gap-6 overflow-y-auto">
                {Array.from({ length: 3 }).map(item => (
                    <div className="border rounded-md shadow-sm border-gray-200 col-span-12 h-[160px]">
                        <div className="h-[25%] p-2"><p className="text-gray-700 text-lg ">Murat Eke</p></div>
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

    )
}

export default UserComments
