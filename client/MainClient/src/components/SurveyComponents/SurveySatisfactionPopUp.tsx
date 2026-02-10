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
        const val = {
            ...values,
            surveyId
        }
        mutation.mutate(val, {
            onSuccess: () => {
                showToast("Feedback saved successfully")
                InvisibleFunc();
            },
            onError: () => {
                showToast("An error has occured")
                InvisibleFunc();
            }
        });

    }

    return (
        <div className='bg-black/40 fixed inset-0 size-screen z-40 flex items-center justify-center'>
            <div className='w-60 h-30 bg-white rounded-lg shadow-custom border border-gray-100'>
                <div className='h-10 flex items-center justify-center'>
                    <p className='ps-2 text-slate-700 text-lg '>
                        Satisfied With Survey ?
                    </p>
                </div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ setFieldValue, submitForm }) => (
                        <Form>
                            <div className='grid grid-cols-2 h-20'>
                                <div className='flex items-center justify-center'>
                                    <button type='button' onClick={() => { setFieldValue('satisfaction', 1); submitForm() }} className='rounded-full border-none outline-none hover:scale-102 transition-all'>
                                        <img src={happy} width={55} className='bg-orange-500 rounded-full'></img>
                                    </button>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <button type='button' onClick={() => { setFieldValue('satisfaction', 2); submitForm() }} className='rounded-full border-none outline-none hover:scale-102 transition-all'>
                                        <img src={sad} width={55} className='bg-sky-500 rounded-full'></img>
                                    </button>
                                </div>
                            </div>
                        </Form>

                    )}

                </Formik>

            </div>
        </div>
    )
}

export default SurveySatisfactionPopUp
