import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { produce } from 'immer';


type Answer = {
    id: string
    text: string
}
type Question = {
    id: string,
    text: string,
    answers: Answer[]
}
type Survey = {
    id: string,
    questions: Question[]
}


const initialSurvey: Survey = {
    id: "1",
    questions: [
        {
            id: "1",
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { id: "1", text: "Sistem Analizi" },
                { id: "1", text: "Çalışan Güvenlik Sistemi" },
            ]
        },
    ]
}

function SurveyBuilder() {

    const [survey, setSurvey] = useState<Survey>(initialSurvey);
    const [newAnswer, setNewAnswer] = useState<string>("");
    const [newQuestionHeader, setNewQuestionHeader] = useState<string>("");


    const handleAddNewQuestion = (text: string) => {
        setSurvey(produce(survey, (draft) => {
            const newId = draft.questions.length + 1;
            draft.questions.push({
                id: newId.toString(),
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
                    id: question.id,
                    text: text
                })
            }
        }))
    }

    /* Value kısmı eklenecek iç answer inputunda */
    return (
        <div className='m-10 bg-white container  mx-auto shadow-md  border'>
            <div className='text-center'>
                <p className='text-5xl text-gray-600 p-5' style={{ fontFamily: "roobert" }}>Build New Survey</p>
            </div>
            <div className='flex justify-end my-5 mx-5'>
                <input value={newQuestionHeader} onChange={(e) => setNewQuestionHeader(e.target.value)} className='ps-2 mx-2 border-b-2 outline-none focus:outline-none' placeholder='New Question'></input>
                <button onClick={() => handleAddNewQuestion(newQuestionHeader)} className='border bg-green-600 hover:bg-green-700 rounded-sm text-white p-1 text-lg'>+ Add New Question</button>

            </div>
            <div >
                {survey.questions.map((question) => (
                    <div key={question.id} className='border rounded-sm p-5 m-5 shadow-sm'>
                        <p className='text-lg'>{question.id}{`) `}{question.text}</p>
                        <div className='mt-4'>
                            {question.answers.map((answer, index) => (
                                <div key={index} className='ps-4 my-1'>
                                    <input value={answer.text} type='radio' id={`${question.id}-${index}`} name={`${question.id}`}></input>
                                    <label className='ps-1'>{answer.text}</label>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <input onChange={(e) => setNewAnswer(e.target.value)} className='ps-2 mx-2 border-b-2 outline-none focus:outline-none' placeholder='New Answer'></input>
                            <button onClick={() => handleAddNewAnswer(question.id, newAnswer)} className='border bg-indigo-400 hover:bg-indigo-500 rounded-sm text-white p-1 text-lg'>+ Add New Answer</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default SurveyBuilder
