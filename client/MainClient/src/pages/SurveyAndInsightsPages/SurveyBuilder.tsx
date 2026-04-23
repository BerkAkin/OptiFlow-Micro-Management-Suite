import { useState } from 'react'
import { produce } from 'immer';
import add from '../../assets/add.svg'
import trash from '../../assets/trash.svg'
import send from '../../assets/send.svg'
import { useSendSurvey } from '../../hooks/SurveyHooks/useSurvey';
import { useToatsContext } from '../../context/ToastContext';

const initialSurvey = {
    title: "",
    questions: [
        {
            title: "",
            answers: [
                { title: "" },
            ]
        },
    ]
}

function SurveyBuilder() {
    const mutation = useSendSurvey();
    const { showToast } = useToatsContext();
    const [survey, setSurvey] = useState(initialSurvey);
    const [surveyName, setSurveyName] = useState<string>("")
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const handleAddQuestion = (text: string) => {
        if (!text.trim()) return;
        setSurvey(produce(survey, draft => {
            draft.questions.push({ title: text, answers: [] });
        }))
        setQuestion("")
    }

    const handleAddAnswer = (text: string, qIndex: number) => {
        if (!text.trim()) return;
        setSurvey(produce(survey, draft => {
            draft.questions[qIndex].answers.push({ title: text })
        }))
        setAnswer("")
    }

    const handleSurveyName = (text: string) => {
        if (!text.trim()) return;
        setSurvey(produce(survey, draft => {
            draft.title = text;
        }))
        setSurveyName("")
    }

    const deleteQuestion = (qIndex: number) => {
        setSurvey(produce(survey, draft => {
            draft.questions.splice(qIndex, 1)
        }))
    }

    const deleteAnswer = (qIndex: number, aIndex: number) => {
        setSurvey(produce(survey, draft => {
            draft.questions[qIndex].answers.splice(aIndex, 1);
        }))
    }

    const handleFinishSurvey = async () => {
        if (!survey.title.trim()) return;
        mutation.mutate(survey, {
            onSuccess: () => showToast("Survey saved successfully"),
            onError: () => showToast("An error has occured")
        });
    };

    return (
        <div className='container my-10 mx-auto border border-gray-200 shadow-custom rounded-xl overflow-hidden'>
            <div className='bg-white border-b border-gray-200 p-8 text-center'>
                <h1 className='text-3xl font-bold text-gray-800 font-rubik tracking-tight'>Build New Survey</h1>
                <p className='text-gray-400 mt-2'>Start by giving a name to your survey...</p>
            </div>

            <div className='p-8'>
                <div className='flex gap-3 bg-white p-2 rounded-lg border border-gray-200 mb-8'>
                    <input
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                        className='flex-1 ps-4 py-3 text-md border-b-2 border-transparent transition outline-none text-gray-700'
                        placeholder='Type survey title here...'
                    />
                    <button
                        onClick={() => handleSurveyName(surveyName)}
                        className='bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition active:scale-95 cursor-pointer'
                    >
                        <img src={add} alt="Add" className="brightness-0 invert w-6 h-6" />
                    </button>
                </div>

                {survey.title && (
                    <div className="space-y-6">
                        <div className='bg-white flex flex-col flex-row items-center justify-between gap-4 p-2 rounded-lg border border-gray-200'>
                            <h3 className='text-xl font-semibold text-slate-700 ps-4'>
                                {survey.title} Survey
                            </h3>
                            <div className='flex flex-1 max-w-md gap-2'>
                                <input
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className='flex-1 ps-4 py-2 rounded-lg border border-gray-200 outline-none'
                                    placeholder='New Question Text...'
                                />
                                <button
                                    onClick={() => handleAddQuestion(question)}
                                    className='bg-green-500 hover:bg-green-600 p-2 rounded-lg transition active:scale-95 cursor-pointer'
                                >
                                    <img src={add} alt="Add" className="brightness-0 invert w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            {survey.questions.map((question, qIndex) => (
                                <div key={qIndex} className='bg-white rounded-xl p-4 border border-gray-200 transition'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <h2 className='text-lg font-medium text-gray-800 flex items-center'>
                                            <span className='text-slate-700 px-2'>Question {qIndex + 1})</span>
                                            <span className='text-slate-500'>{question.title}</span>
                                        </h2>
                                        <button onClick={() => deleteQuestion(qIndex)} className='p-2 hover:bg-red-200 rounded-full transition cursor-pointer'>
                                            <img src={trash} alt="Delete" className="w-5 h-5 transition" />
                                        </button>
                                    </div>

                                    <div className='space-y-2 mb-6 ml-10'>
                                        {question.answers.map((answer, aIndex) => (
                                            <div key={aIndex} className='flex items-center border border-gray-200 rounded-lg px-4 py-2 w-fit min-w-[200px]'>
                                                <h2 className="text-sm flex-1 text-gray-600">
                                                    Ans {aIndex + 1})
                                                    <span className='text-slate-500'> {answer.title}</span>
                                                </h2>
                                                <button onClick={() => deleteAnswer(qIndex, aIndex)} className='ml-4 transition p-1 hover:bg-red-200 rounded-full cursor-pointer'>
                                                    <img src={trash} alt="Delete" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex items-center gap-2 ml-10'>
                                        <input
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className='text-sm border-b border-gray-200 outline-none py-1 w-48 transition'
                                            placeholder='Add an option...'
                                        />
                                        <button onClick={() => handleAddAnswer(answer, qIndex)} className='hover:bg-green-100 rounded-full transition cursor-pointer'>
                                            <img src={add} alt="Add" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-center pt-10'>
                            <button onClick={handleFinishSurvey}
                                className='flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full cursor-pointer font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50'
                                disabled={survey.questions.length === 0}>
                                <span>Finish & Create Survey</span>
                                <img src={send} alt="Send" className="w-5 h-5 brightness-0 invert" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SurveyBuilder