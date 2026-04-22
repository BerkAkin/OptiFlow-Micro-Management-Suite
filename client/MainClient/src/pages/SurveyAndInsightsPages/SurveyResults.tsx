import { useParams } from "react-router"
import { useSurveyResult } from "../../hooks/SurveyHooks/useSurvey";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";

function SurveyResults() {
    const { id } = useParams();
    const { data, isLoading, error } = useSurveyResult(Number(id!));

    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

    return (
        <div className='container mx-auto my-10 grid grid-cols-12 gap-8 px-4'>
            <div className="col-span-2 bg-blue-600 rounded-xl shadow-custom border border-gray-200 p-8 flex items-center justify-center ">
                <div className="text-center">
                    <h1 className='font-rubik text-3xl font-bold text-white tracking-tight'>
                        {data.name}
                    </h1>
                    <p className="text-gray-100 mt-2 italic">Survey Results</p>
                </div>
            </div>

            <div className="col-span-10 bg-white rounded-xl shadow-custom border border-gray-200 h-[650px] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Answers</h2>
                </div>

                <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {data.questions.map((question: any, questionIndex: number) => (
                        <div key={questionIndex} className="group">
                            <div className="flex items-start mb-4">
                                <span className="w-8 h-8 text-blue-600 flex items-center justify-center font-bold mr-3">
                                    {questionIndex + 1})
                                </span>
                                <p className="text-lg font-medium text-gray-900 pt-0.5">
                                    {question.title}
                                </p>
                            </div>

                            <div className="grid gap-3 ml-11">
                                {question.answers.map((answer: any, answerIndex: number) => (
                                    <div key={answerIndex} className="relative">
                                        <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-all ">
                                            <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors">
                                                {answer.title}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-block bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-sm">
                                                    {answer.count} People
                                                </span>
                                            </div>
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