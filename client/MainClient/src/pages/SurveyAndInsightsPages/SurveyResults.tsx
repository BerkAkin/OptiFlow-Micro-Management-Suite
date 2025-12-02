import { useParams } from "react-router"
import { useSurveyResult } from "../../hooks/SurveyHooks/useSurvey";


function SurveyResults() {
    const { slug } = useParams();
    const { data, isLoading, error } = useSurveyResult(slug!);
    const name = slug?.split("-").join(" ");

    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)


    return (
        <div className='container mx-auto my-10 grid grid-cols-10 gap-6' >
            <div className="col-span-2 bg-white border border-gray-200 rounded-lg shadow-custom ">
                <div className={`w-full h-full flex items-center justify-center`}>
                    <p className='font-rubik text-center text-4xl text-gray-500 mx-6'>{name} Results</p>
                </div>
            </div>
            <div className="col-span-8 bg-white border border-gray-200 rounded-lg shadow-custom h-[650px] p-6">
                <div className="overflow-y-auto w-full h-full">
                    {data.questions.map((item, index) => (
                        <div key={index}>
                            <div>
                                <p className="my-3 text-lg text-gray-800">{index + 1})  {item.text}</p>
                                {item.answers.map((answer, index) => (
                                    <div key={index}>
                                        <div className="py-1">
                                            <p className="ps-6 text-gray-500 inline">-{answer.text} </p>
                                            <p className="inline bg-indigo-400 text-white px-1 ms-2 rounded-sm">{answer.count} % </p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                    ))}
                </div>

            </div>

        </div>


    )
}

export default SurveyResults
