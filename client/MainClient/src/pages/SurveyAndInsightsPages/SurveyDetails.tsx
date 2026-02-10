import { Form, Formik } from 'formik';
import { useParams } from 'react-router';
import send from '../../assets/send.svg';
import { useSubmitSurvey, useSurveyDetails } from '../../hooks/SurveyHooks/useSurvey';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useState } from 'react';
import SurveySatisfactionPopUp from '../../components/SurveyComponents/SurveySatisfactionPopUp';
import { useToatsContext } from '../../context/ToastContext';




function SurveyDetails() {

    const mutation = useSubmitSurvey();
    const { showToast } = useToatsContext();
    const { id } = useParams();
    const { isLoading, error, data } = useSurveyDetails(id);
    const [isSatisfaction, setIsSatisfaction] = useState<boolean>(false);

    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)


    const handleSubmit = (values: any) => {
        mutation.mutate({ answers: values, surveyId: data.id, }, {
            onSuccess: () => {
                showToast("Survey answers submitted successfully!");
            },
            onError: () => {
                showToast("An error has occured");
            },
        })

    }


    return (
        <div className='container m-10 bg-white mx-auto shadow-custom border border-gray-200 '>
            <div className='text-center'>
                <p className='text-3xl text-gray-700 p-6 font-rubik' >{data.title}</p>
            </div>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <div>

                            {data.questions.map((questions: any, index: number) => (
                                <div key={questions.id} className='rounded-sm p-6 m-6'>
                                    <div>
                                        <div><p className='text-lg text-gray-800'>{index + 1}{`) `}{questions.title}</p></div>
                                    </div>

                                    <div className='mt-6'>
                                        {questions.answers.map((answer: any, index: number) => (
                                            <div key={index} className='ps-6 my-2 flex justify-start items-center'>
                                                <input onChange={handleChange} className='cursor-pointer hidden peer' value={answer.id} type='radio' id={`${answer.id}`} name={`${questions.id}`}></input>
                                                <label htmlFor={`${answer.id}`} className=" block w-[25%] text-lg bg-gray-100 text-gray-700 p-2 cursor-pointer rounded-sm peer-checked:bg-indigo-400 peer-checked:text-white hover:bg-indigo-100 transition hover:scale-102 transition-all active:scale-[0.98]">{answer.title}</label>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                            ))}
                        </div>
                        <div className='flex justify-end items-center '>
                            <button type='button' onClick={() => setIsSatisfaction(!isSatisfaction)} className='cursor-pointer my-6 p-2 rounded-sm text-lg text-white bg-sky-600 hover:bg-sky-700 transition-all active:scale-[0.90]'>Feedback</button>

                            <button type='submit' className='cursor-pointer m-6 p-2 rounded-sm text-lg text-white bg-green-600 hover:bg-green-700 transition-all active:scale-[0.90]'><img src={send} width={25} alt="" /></button>
                        </div>
                    </Form>
                )}

            </Formik>
            {isSatisfaction && <SurveySatisfactionPopUp surveyId={Number(id)} InvisibleFunc={() => setIsSatisfaction(!isSatisfaction)} />}
        </div>



    )
}

export default SurveyDetails
