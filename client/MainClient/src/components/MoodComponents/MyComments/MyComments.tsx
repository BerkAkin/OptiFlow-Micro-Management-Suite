import { useMyComments } from "../../../hooks/MoodHooks/UseMood";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Spinner from "../../Spinner/Spinner";


function MyComments() {

    const { data, isLoading, error } = useMyComments();
    if (isLoading) return <Spinner />
    if (error || !data) return <ErrorMessage />

    return (


        <div className="h-full">


            <div className="">
                <div className='h-[10%] text-start flex justify-start'>
                    <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4`}>Comments</p>
                </div>
                <div className="h-[160px] overflow-y-auto grid grid-cols-12 gap-2 px-4">
                    {data.map((item: any) => (
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

export default MyComments
