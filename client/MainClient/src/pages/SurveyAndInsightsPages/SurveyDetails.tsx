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

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="h-screen flex items-center justify-center"><ErrorMessage /></div>;

    const handleSubmit = (values: any) => {
        mutation.mutate({ answers: values, surveyId: data.id }, {
            onSuccess: () => {
                showToast("Anket yanıtları başarıyla gönderildi!");
            },
            onError: () => {
                showToast("Bir hata oluştu, lütfen tekrar deneyin.");
            },
        });
    };

    return (
        <div className='max-w-4xl mx-auto my-12 px-4'>
            <div className='bg-white rounded-t-3xl border-x border-t border-gray-100 p-10 text-center shadow-sm'>
                <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight mb-2'>{data.title}</h1>
                <p className='text-slate-400 text-sm'>Lütfen tüm soruları eksiksiz yanıtlayınız.</p>
            </div>

            <Formik initialValues={{}} onSubmit={handleSubmit}>
                {({ handleChange }) => (
                    <Form className='space-y-6'>
                        <div className='bg-slate-50/50 border border-gray-100 p-2 md:p-6 space-y-6'>
                            {data.questions.map((question: any, index: number) => (
                                <div key={question.id} className='bg-white rounded-2xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md'>
                                    <div className='flex gap-4 items-start mb-6'>
                                        <span className='flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm'>
                                            {index + 1}
                                        </span>
                                        <p className='text-xl font-bold text-slate-700 leading-snug'>
                                            {question.title}
                                        </p>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
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
                                                    className="flex items-center justify-between px-5 py-4 bg-slate-50 text-slate-600 font-semibold cursor-pointer rounded-xl border-2 border-transparent transition-all peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:bg-slate-100"
                                                >
                                                    <span>{answer.title}</span>
                                                    <div className='w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center peer-checked:border-indigo-500'>
                                                        <div className='w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 transition-opacity peer-checked:opacity-100' />
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='bg-white rounded-b-3xl border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm'>
                            <button
                                type='button'
                                onClick={() => setIsSatisfaction(true)}
                                className='flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors'
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                Geri Bildirim Ver
                            </button>

                            <button
                                type='submit'
                                className='w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95'
                            >
                                <img src={send} width={20} alt="" className="brightness-0 invert" />
                                Anketi Tamamla
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {isSatisfaction && (
                <SurveySatisfactionPopUp
                    surveyId={Number(id)}
                    InvisibleFunc={() => setIsSatisfaction(false)}
                />
            )}
        </div>
    );
}

export default SurveyDetails;