import { Form, Formik } from 'formik';
import { useParams } from 'react-router';
import send from '../../assets/send.svg';
import { useSubmitSurvey, useSurveyDetails } from '../../hooks/SurveyHooks/useSurvey';




function SurveyDetails() {

    const mutation = useSubmitSurvey();
    const { slug } = useParams();
    const surveyName = slug?.split("-").join(" ");

    const { isLoading, error, data } = useSurveyDetails(slug!);

    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)


    const handleSubmit = (values: any) => {
        mutation.mutate({ answers: values, surveyId: data.id })
    }


    return (
        <div className='container m-10 bg-white mx-auto shadow-custom border border-gray-200 '>
            <div className='text-center'>
                <p className='text-3xl text-gray-700 p-6 font-rubik' >{surveyName}</p>
            </div>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <div>

                            {data.questions.map((question) => (
                                <div key={question.id} className='rounded-sm p-6 m-6'>
                                    <div>
                                        <div><p className='text-lg text-gray-800'>{question.id}{`) `}{question.text}</p></div>
                                    </div>

                                    <div className='mt-6'>
                                        {question.answers.map((answer, index) => (
                                            <div key={index} className='ps-6 my-2 flex justify-start items-center'>
                                                <input onChange={handleChange} className='cursor-pointer hidden peer' value={answer.id} type='radio' id={`${answer.id}`} name={`${question.id}`}></input>
                                                <label htmlFor={`${answer.id}`} className=" block w-[25%] text-lg bg-gray-100 text-gray-700 p-2 cursor-pointer rounded-sm peer-checked:bg-indigo-400 peer-checked:text-white hover:bg-indigo-100 transition">{answer.text}</label>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                            ))}
                        </div>
                        <div className='flex justify-end items-center '>

                            <button type='submit' onClick={() => console.log()} className='cursor-pointer m-6 p-2 rounded-sm text-lg text-white bg-green-600 hover:bg-green-700'><img src={send} width={25} alt="" /></button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>



    )
}

export default SurveyDetails
