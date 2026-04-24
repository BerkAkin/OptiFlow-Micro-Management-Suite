import { Form, Formik } from 'formik'
import { happy, sad } from '../../../assets/icons';
import { useSatisfaction } from '../../../hooks';
import { useToatsContext } from '../../../context/ToastContext';


const initialValues = {
    satisfaction: 1,
}

interface PopUpProps {
    surveyId: number,
    InvisibleFunc: () => void
}

export function Satisfaction({ surveyId, InvisibleFunc }: PopUpProps) {
    const mutation = useSatisfaction();
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
        <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/20 backdrop-blur-xs transition'>

            <div className='w-[320px] bg-white rounded-xl shadow-custom border border-gray-200 overflow-hidden transform transition scale-100 p-8'>

                <div className='text-center mb-8'>
                    <h3 className='text-lg font-bold text-slate-800 font-rubik tracking-tight'>
                        Quick Feedback
                    </h3>
                    <p className='text-sm text-slate-500 mt-2'>
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
                                        className='cursor-pointer relative p-1 rounded-full transition hover:scale-110 active:scale-90'
                                    >
                                        <div className='bg-emerald-500 p-4 rounded-full transition hover:bg-emerald-600'>
                                            <img src={happy} alt="Happy" className='w-10 h-10 brightness-0 invert' />
                                        </div>
                                    </button>
                                </div>

                                <div className='flex flex-col items-center gap-3 group'>
                                    <button
                                        type='button'
                                        onClick={() => { setFieldValue('satisfaction', 2); submitForm() }}
                                        className='cursor-pointer relative p-1 rounded-full transition hover:scale-110 active:scale-90'
                                    >
                                        <div className='bg-rose-500 p-4 rounded-full transition hover:bg-rose-600'>
                                            <img src={sad} alt="Sad" className='w-10 h-10 brightness-0 invert' />
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>

                <div className='mt-8 flex justify-center'>
                    <button
                        type="button"
                        onClick={InvisibleFunc}
                        className='text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-tight outline-none'
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    )
}

