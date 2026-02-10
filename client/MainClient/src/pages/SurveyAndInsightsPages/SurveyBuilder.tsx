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
        console.log(survey)
        mutation.mutate(survey, {
            onSuccess: () => {
                showToast("Survey saved successfully")
            },
            onError: () => {
                showToast("An error has occured")
            }
        });
    };



    return (
        <div className='container m-10 bg-white mx-auto border border-gray-200 shadow-custom rounded-lg'>
            <div className='text-center'>
                <p className='text-5xl text-gray-600 p-6 font-rubik'>Build New Survey</p>
            </div>

            <div className='flex justify-end m-6 pe-1'>
                <input value={surveyName} onChange={(e) => setSurveyName(e.target.value)} className='cursor-pointer ps-6 w-[25%] border border-gray-200 rounded-sm outline-none focus:outline-none' placeholder='Survey Name...'></input>
                <button onClick={() => handleSurveyName(surveyName)} className='transition-all hover:scale-102 active:scale-[0.95] cursor-pointer rounded-sm text-white p-2 text-lg'><img src={add} alt="" width={40} /></button>
            </div>
            {survey.title && (<div>
                <div className='m-6 grid grid-cols-10'>
                    <div className='col-span-6 flex items-center'>
                        <p className='ps-6 text-3xl text-gray-600'>{survey.title}</p>
                    </div>
                    <div className='col-span-4 flex items-center'>
                        <input value={question} onChange={(e) => setQuestion(e.target.value)} className='w-[90%] h-full cursor-pointer ps-6 border border-gray-200 rounded-sm outline-none focus:outline-none' placeholder='New Question...'></input>
                        <button onClick={() => handleAddQuestion(question)} className='transition-all hover:scale-102 active:scale-[0.95] cursor-pointer rounded-sm text-white p-2 text-lg'><img src={add} alt="" width={40} /></button>
                    </div>

                </div>
                <div>
                    {survey.questions.map((question, qIndex) => (
                        <div key={qIndex} className='rounded-lg p-6 m-6 border border-gray-200'>
                            <div className='grid grid-cols-10'>
                                <div className='col-span-9'><p className='ps-4 text-2xl text-gray-600 pt-2'>{qIndex + 1}) {question.title}</p></div>
                                <div className='col-span-1 flex justify-end'><button onClick={() => deleteQuestion(qIndex)} className='cursor-pointer transition-all hover:scale-102 active:scale-[0.95]'><img src={trash} alt="" width={40} /></button></div>
                            </div>

                            <div className='mt-2'>
                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className='ps-6 flex justify-start items-center'>
                                        <p className=" block w-[35%] text-lg text-gray-700 py-1">-{answer.title}</p>
                                        <button onClick={() => deleteAnswer(qIndex, aIndex)} className='cursor-pointer ps-2 transition-all hover:scale-102 active:scale-[0.95]'><img src={trash} alt="" width={25} /></button>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-start'>
                                <input value={answer} onChange={(e) => setAnswer(e.target.value)} className='cursor-pointer w-[30%] ps-6 ms-4 border border-gray-200 outline-none focus:outline-none rounded-sm' placeholder='New Answer...'></input>
                                <button onClick={() => handleAddAnswer(answer, qIndex)} className='cursor-pointer p-2 transition-all hover:scale-102 active:scale-[0.95]'><img src={add} alt="" width={40} /></button>
                            </div>

                        </div>

                    ))}
                </div>

                <div className='flex justify-end'>
                    <button onClick={handleFinishSurvey} className='cursor-pointer m-6 bg-gray-700 hover:bg-gray-900 rounded-sm text-white p-2 text-lg transition-all active:scale-[0.95]'><img src={send} alt="" /></button>
                </div>

            </div>)}


        </div>
    )
}

export default SurveyBuilder
