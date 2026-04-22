import { Form, Formik } from 'formik'
import happy from '../../assets/happyWhite.svg';
import sad from '../../assets/sadWhite.svg';
import { UseSatisfaction } from '../../hooks/SurveyHooks/useSurvey';
import { useToatsContext } from '../../context/ToastContext';

const initialValues = {
    satisfaction: 1,
}

interface PopUpProps {
    surveyId: number,
    InvisibleFunc: () => void
}

function SurveySatisfactionPopUp({ surveyId, InvisibleFunc }: PopUpProps) {
    const mutation = UseSatisfaction();
    const { showToast } = useToatsContext();

    const handleSubmit = (values: any) => {
        const val = { ...values, surveyId }
        mutation.mutate(val, {
            onSuccess: () => {
                showToast("Feedback saved successfully")
                InvisibleFunc();
            },
            onError: () => {
                showToast("An error has occurred")
                InvisibleFunc();
            }
        });
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs transition'>

            <div className='w-[320px] bg-white rounded-xl shadow-custom border border-gray-200 overflow-hidden transform transition scale-100 p-8'>

                <div className='text-center mb-8'>
                    <h3 className='text-xl font-bold text-slate-800 font-rubik tracking-tight'>
                        Quick Feedback
                    </h3>
                    <p className='text-sm text-slate-500 mt-2 font-medium'>
                        Are you satisfied with this survey?
                    </p>
                </div>

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ setFieldValue, submitForm }) => (
                        <Form>
                            <div className='flex justify-around items-center gap-4'>

                                <div className='flex flex-col items-center gap-3 group'>
                                    <button
                                        type='button'
                                        onClick={() => { setFieldValue('satisfaction', 1); submitForm() }}
                                        className='relative p-1 rounded-full transition-all duration-300 transform group-hover:scale-110 active:scale-90 shadow-lg shadow-emerald-100'
                                    >
                                        <div className='bg-emerald-500 p-4 rounded-full transition-colors group-hover:bg-emerald-600'>
                                            <img src={happy} alt="Happy" className='w-10 h-10 brightness-0 invert' />
                                        </div>
                                    </button>
                                    <span className='text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors'>YES</span>
                                </div>

                                <div className='flex flex-col items-center gap-3 group'>
                                    <button
                                        type='button'
                                        onClick={() => { setFieldValue('satisfaction', 2); submitForm() }}
                                        className='relative p-1 rounded-full transition-all duration-300 transform group-hover:scale-110 active:scale-90 shadow-lg shadow-rose-100'
                                    >
                                        <div className='bg-rose-500 p-4 rounded-full transition-colors group-hover:bg-rose-600'>
                                            <img src={sad} alt="Sad" className='w-10 h-10 brightness-0 invert' />
                                        </div>
                                    </button>
                                    <span className='text-xs font-bold text-slate-400 group-hover:text-rose-600 transition-colors'>NO</span>
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>

                <div className='mt-8 flex justify-center'>
                    <button
                        type="button"
                        onClick={InvisibleFunc}
                        className='text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest outline-none'
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SurveySatisfactionPopUp;