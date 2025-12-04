import { useSupportEmployeeComments } from "../../../hooks/SupportHooks/UseSupport";


function UserComments({ UserId }: { UserId: number }) {

    const { data, isLoading, error } = useSupportEmployeeComments(UserId);
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    return (


        <div className="h-full">


            <div className=" border rounded-md border-gray-200 ">
                <div className='flex justify-center mb-6'>
                    <p className='px-6 rounded-b-md bg-lime-600 text-xl text-white'>Employee Comments</p>
                </div>
                <div className="h-[370px] overflow-y-auto">
                    {data.map(item => (
                        <div className="border mx-6 my-4 rounded-md shadow-sm border-gray-200 col-span-12 h-[160px]">
                            <div className="h-[25%] p-2"><p className="text-gray-700 text-lg ">{item.user}</p></div>
                            <div className="h-[60%] overflow-hidden px-2">
                                <p className="text-gray-500">
                                    {item.comment}
                                </p>
                            </div>
                            <div className="h-[15%] px-2 grid grid-cols-2">
                                <div>
                                    <p className="text-orange-300 ">{item.stars} ★</p>
                                </div>
                                <div className="flex justify-end">
                                    <p className="text-gray-400">{item.date}</p>
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
