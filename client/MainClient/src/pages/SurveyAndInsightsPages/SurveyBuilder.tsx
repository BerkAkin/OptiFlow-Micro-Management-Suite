import { useState } from 'react'
import { produce } from 'immer';

import deleteSurvey from '../../assets/deleteSurvey.svg'
import add from '../../assets/add.svg'
import trash from '../../assets/trash.svg'
import send from '../../assets/send.svg'

type Answer = {
    id: string
    text: string
    voteCount: number,

}
type Question = {
    id: string,
    text: string,

    answers: Answer[]
}
type Survey = {
    id: string,
    participateCount: number,
    questions: Question[]
}


const initialSurvey: Survey = {
    id: "1",
    participateCount: 0,
    questions: [
        {
            id: "1",
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { id: "1-1", text: "Sistem Analizi", voteCount: 0 },
                { id: "1-2", text: "Çalışan Güvenlik Sistemi", voteCount: 0 },
            ]
        },
    ]
}

const handleFinishSurvey = async () => {
    try {
        const response = await fetch("/api/surveys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(initialSurvey)
        });

        if (!response.ok) throw new Error("Survey gönderilemedi!");

        const data = await response.json();
        console.log("Survey gönderildi:", data);
    } catch (error) {
        console.error(error);
    }
};

function SurveyBuilder() {

    const [survey, setSurvey] = useState<Survey>(initialSurvey);
    const [newAnswer, setNewAnswer] = useState<string>("");
    const [newQuestionHeader, setNewQuestionHeader] = useState<string>("");


    const handleAddNewQuestion = (text: string) => {
        setSurvey(produce(survey, (draft) => {
            draft.questions.push({
                id: `${draft.questions.length + 1}`,
                text: text,
                answers: [],
            })
        }))
    }

    const handleAddNewAnswer = (questionId: string, text: string) => {
        setSurvey(produce(survey, (draft) => {
            const question = draft.questions.find((q) => q.id === questionId)
            if (question) {
                question.answers.push({
                    id: `${question.id}-${question.answers.length + 1}`,
                    text: text,
                    voteCount: 0,
                })
            }
        }))
    }

    const deleteAnswer = (questionId: string, answerId: string) => {
        setSurvey(produce(survey, (draft) => {
            const question = draft.questions.find((q) => q.id === questionId);
            if (question) {
                question.answers = question.answers.filter((a) => a.id !== answerId);
            }
        }));
    };

    const deleteQuestion = (questionId: string) => {
        setSurvey(produce(survey, (draft) => {
            const question = draft.questions.find((q) => q.id === questionId)
            if (question) {
                draft.questions = draft.questions.filter((f) => f.id !== questionId)
            }

        }))
    }


    /* Value kısmı eklenecek iç answer inputunda */
    return (
        <div className='container m-10 bg-white mx-auto border border-gray-200 shadow-custom rounded-lg'>
            <div className='text-center'>
                <p className='text-5xl text-gray-600 p-6 font-rubik'>Build New Survey</p>
            </div>
            <div className='flex justify-end m-6'>
                <input value={newQuestionHeader} onChange={(e) => setNewQuestionHeader(e.target.value)} className='cursor-pointer ps-6 w-[25%] border border-gray-200 rounded-sm outline-none focus:outline-none' placeholder='New Question'></input>
                <button onClick={() => handleAddNewQuestion(newQuestionHeader)} className='cursor-pointer rounded-sm text-white p-2 text-lg'><img src={add} alt="" width={40} /></button>

            </div>
            <div>
                {survey.questions.map((question) => (
                    <div key={question.id} className='rounded-lg p-6 m-6 border border-gray-200'>
                        <div className='grid grid-cols-10'>
                            <div className='col-span-9'><p className='text-lg text-gray-800 '>{question.id}{`) `}{question.text}</p></div>
                            <div className='col-span-1 flex justify-end'><button onClick={() => deleteQuestion(question.id)} className='cursor-pointer'><img src={trash} alt="" width={40} /></button></div>
                        </div>

                        <div className='mt-6'>
                            {question.answers.map((answer, index) => (
                                <div key={index} className='ps-4 my-2 flex justify-start items-center'>
                                    <input className='hidden peer cursor-pointer' value={answer.text} type='radio' id={`${question.id}-${answer.id}`} name={`${question.id}`}></input>
                                    <label htmlFor={`${question.id}-${answer.id}`} className=" block w-[35%] border border-gray-200 text-lg bg-gray-100 text-gray-700 p-3 cursor-pointer rounded-sm peer-checked:bg-indigo-400 peer-checked:text-white hover:bg-indigo-100 transition">{answer.text}</label>
                                    <button onClick={() => deleteAnswer(question.id, answer.id)} className='cursor-pointer ps-2'><img src={trash} alt="" width={25} /></button>

                                </div>
                            ))}
                        </div>
                        <div className='flex justify-start'>
                            <input onChange={(e) => setNewAnswer(e.target.value)} className='cursor-pointer w-[30%] ps-6 ms-4 border border-gray-200 outline-none focus:outline-none rounded-sm' placeholder='New Answer'></input>
                            <button onClick={() => handleAddNewAnswer(question.id, newAnswer)} className='cursor-pointer p-2'><img src={add} alt="" width={40} /></button>
                        </div>

                    </div>

                ))}
            </div>
            <div className='flex justify-end'>
                <button onClick={handleFinishSurvey} className='cursor-pointer m-6 bg-gray-700 hover:bg-gray-900 rounded-sm text-white p-2 text-lg'><img src={send} alt="" /></button>
            </div>

        </div>
    )
}

export default SurveyBuilder
