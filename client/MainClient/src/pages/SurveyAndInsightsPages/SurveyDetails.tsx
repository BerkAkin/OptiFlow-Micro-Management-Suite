import { Form, Formik } from 'formik';
import { useState } from 'react'
import { useParams } from 'react-router-dom';


type Answer = {
    id: string,
    text: string,
}
type Question = {
    id: string,
    text: string,
    answers: Answer[],
}
type Survey = {
    id: string,
    questions: Question[],
}


const initialSurvey: Survey = {
    id: "1",
    questions: [
        {
            id: "1",
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { id: "1-1", text: "Sistem Analizi" },
                { id: "1-2", text: "Çalışan Güvenlik Sistemi" },
            ]
        },
        {
            id: "2",
            text: "Aşağıdaki Denemedir",
            answers: [
                { id: "2-1", text: "Sistem Denemesi" },
                { id: "2-2", text: "Çalışan Güvenlik Denemesi" },
            ]
        },
    ],

}


function SurveyDetails() {

    const [survey, setSurvey] = useState<Survey>(initialSurvey);
    const { slug } = useParams();
    const surveyName = slug?.split("-").join(" ");

    const submitForm = (e: any) => {
        e.prevent.default();

    }




    /* Value kısmı eklenecek iç answer inputunda */
    return (
        <div className='m-10 bg-white container mx-auto shadow-custom border '>
            <div className='text-center'>
                <p className='text-3xl text-gray-700 p-6 font-rubik' >{surveyName}</p>
            </div>
            <Formik initialValues={{}} onSubmit={(values) => { console.log("Gönderilen cevaplar:", values) }}>
                {({ values, handleChange }) => (
                    <Form>
                        <div>
                            {survey.questions.map((question) => (
                                <div key={question.id} className='rounded-sm p-6 m-6'>
                                    <div>
                                        <div><p className='text-lg text-gray-800'>{question.id}{`) `}{question.text}</p></div>
                                    </div>

                                    <div className='mt-6'>
                                        {question.answers.map((answer, index) => (
                                            <div key={index} className='ps-6 my-2 flex justify-start items-center'>
                                                <input onChange={handleChange} className='hidden peer' value={answer.text} type='radio' id={`${question.id}-${answer.id}`} name={`${question.id}`}></input>
                                                <label htmlFor={`${question.id}-${answer.id}`} className=" block w-[25%] text-lg bg-gray-100 text-gray-700 p-2 cursor-pointer rounded-sm peer-checked:bg-indigo-400 peer-checked:text-white hover:bg-indigo-100 transition">{answer.text}</label>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                            ))}
                        </div>
                        <div className='flex justify-end items-center '>

                            <button type='submit' onClick={() => console.log()} className=' m-6 p-2 rounded-sm text-lg text-white bg-green-600 hover:bg-green-700'>Send Answers</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>



    )
}

export default SurveyDetails
