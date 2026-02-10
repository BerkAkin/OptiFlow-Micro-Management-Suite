import { useParams } from "react-router"
import { useSurveyResult } from "../../hooks/SurveyHooks/useSurvey";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import person from '../../assets/person.svg'


function SurveyResults() {
    const { id } = useParams();
    const { data, isLoading, error } = useSurveyResult(Number(id!));
    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

    console.log(data);
    return (
        <div className='container mx-auto my-10 grid grid-cols-10 gap-6' >
            <div className="col-span-2 bg-white border border-gray-200 rounded-lg shadow-custom ">
                <div className={`w-full h-full flex items-center justify-center`}>
                    <p className='font-rubik text-center text-4xl text-gray-500 mx-6'>{data.name} Results</p>
                </div>
            </div>
            <div className="col-span-8 bg-white border border-gray-200 rounded-lg shadow-custom h-[650px] p-6">
                <div className="overflow-y-auto w-full h-full ">
                    {data.questions.map((question: any, questionIndex: number) => (
                        <div key={questionIndex}>
                            <div>
                                <p className="my-3 text-lg text-gray-800">{questionIndex + 1}) {question.title}</p>
                                {question.answers.map((answer: any, answerIndex: number) => (
                                    <div>
                                        <div className="py-1 transition hover:scale-[0.99] cursor-default">
                                            <p className="ps-6 text-gray-500 inline">-{answer.title} </p>
                                            <p className="inline-block text-center bg-indigo-400 text-white px-1 ms-2 rounded-sm ">{answer.count} Kişi</p>
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
