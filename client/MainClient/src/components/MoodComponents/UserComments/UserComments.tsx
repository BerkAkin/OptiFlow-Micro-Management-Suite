import { useParams } from "react-router";
import { useSupportEmployeeComments } from "../../../hooks/SupportHooks/UseSupport";


function UserComments() {

    const { data, isLoading, error } = useSupportEmployeeComments("1");
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    return (


        <div className="h-full">


            <div className="">
                <div className='h-[10%] text-start flex justify-start'>
                    <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4`}>Comments</p>
                </div>
                <div className="h-[160px] overflow-y-auto grid grid-cols-12 gap-2 px-4">
                    {data.map(item => (
                        <div className="border col-span-6 rounded-md shadow-sm border-gray-200 h-[160px]">
                            <div className="h-[85%] overflow-hidden p-4">
                                <p className="text-gray-500 text-sm">
                                    {item.comment}
                                </p>
                            </div>
                            <div className="h-[15%] px-4 ">
                                <div className="flex justify-start">
                                    <p className="text-gray-400 text-sm">{item.date}</p>
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
