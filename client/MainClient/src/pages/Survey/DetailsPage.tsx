import { Form, Formik } from 'formik';
import { useParams } from 'react-router';
import send from '../../assets/send.svg';
import { useState } from 'react';
import { useToatsContext } from '../../context/ToastContext';
import { ErrorMessage, Spinner } from '../../components/Common';
import { useDetailsSurvey, useSubmit } from '../../hooks';
import { Satisfaction } from '../../components/Survey';

export function DetailsPage() {
    const mutation = useSubmit();
    const { showToast } = useToatsContext();
    const { id } = useParams();
    const { isLoading, error, data } = useDetailsSurvey(id);
    const [isSatisfaction, setIsSatisfaction] = useState<boolean>(false);

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="h-screen flex items-center justify-center"><ErrorMessage /></div>;

    const handleSubmit = (values: any) => {
        mutation.mutate({ answers: values, surveyId: data.id }, {
            onSuccess: () => {
                showToast("Survey answers saved succesfully");
            },
            onError: () => {
                showToast("An error has occured.");
            },
        });
    };

    return (
        <div className='max-w-4xl mx-auto my-12 px-4'>
            <div className='bg-white rounded-xl border border-gray-200 p-10 text-center shadow-custom'>
                <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight mb-2'>{data.title}</h1>
                <p className='text-slate-400 text-sm'>Please answer all questions.</p>
            </div>

            <Formik initialValues={{}} onSubmit={handleSubmit}>
                {({ handleChange }) => (
                    <Form className='space-y-6'>
                        <div className='bg-slate-50/50 p-2 md:p-6 space-y-6'>
                            {data.questions.map((question: any, index: number) => (
                                <div key={question.id} className='bg-white rounded-xl p-8 border border-gray-200 shadow-custom transition'>
                                    <div className='flex gap-4 items-start mb-6'>
                                        <span className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm'>
                                            {index + 1}
                                        </span>
                                        <p className='text-xl font-bold text-slate-700 leading-snug'>
                                            {question.title}
                                        </p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-3'>
                                        {question.answers.map((answer: any) => (
                                            <div key={answer.id} className='relative'>
                                                <input
                                                    onChange={handleChange}
                                                    className='sr-only peer'
                                                    value={answer.id}
                                                    type='radio'
                                                    id={answer.id.toString()}
                                                    name={question.id.toString()}
                                                />
                                                <label
                                                    htmlFor={answer.id.toString()}
                                                    className="flex items-center justify-between px-5 py-4 bg-gray-100 text-slate-600 font-semibold cursor-pointer rounded-lg border border-gray-200 transition peer-checked:bg-blue-100 peer-checked:text-blue-700"
                                                >
                                                    <span>{answer.title}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center gap-4 shadow-custom'>
                            <button
                                type='button'
                                onClick={() => setIsSatisfaction(true)}
                                className='flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-slate-500 cursor-pointer bg-slate-100 transition border border-gray-200'
                            >
                                Give feedback
                            </button>

                            <button
                                type='submit'
                                className='cursor-pointer w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-3 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-700 transition active:scale-95'
                            >
                                <img src={send} width={20} alt="" className="brightness-0 invert" />
                                Finish Survey
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {isSatisfaction && (
                <Satisfaction
                    surveyId={Number(id)}
                    InvisibleFunc={() => setIsSatisfaction(false)}
                />
            )}
        </div>
    );
}

