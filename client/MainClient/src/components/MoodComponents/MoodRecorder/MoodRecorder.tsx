import happy from '../../../../src/assets/happy.svg'
import sad from '../../../../src/assets/sad.svg'
import verySad from '../../../../src/assets/verySad.svg'
import veryHappy from '../../../../src/assets/veryHappy.svg'
import neutral from '../../../../src/assets/neutral.svg'
import save from '../../../assets/save.svg'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useRecordMood } from '../../../hooks/MoodHooks/UseMood'

const Tags = [
    "Work", "Friends", "Ergonomy", "Workload", "Health", "Sickness",
    "Psychology", "Family", "Sleep", "Tiredness", "Food", "Time",
    "Environment", "Weather"
];

const moods = [
    { name: 1, img: verySad, color: "bg-red-100 ring-red-400", activeColor: "bg-red-400", hover: "hover:bg-red-50" },
    { name: 2, img: sad, color: "bg-orange-100 ring-orange-400", activeColor: "bg-orange-400", hover: "hover:bg-orange-50" },
    { name: 3, img: neutral, color: "bg-yellow-100 ring-yellow-400", activeColor: "bg-yellow-400", hover: "hover:bg-yellow-50" },
    { name: 4, img: happy, color: "bg-emerald-100 ring-emerald-400", activeColor: "bg-emerald-400", hover: "hover:bg-emerald-50" },
    { name: 5, img: veryHappy, color: "bg-green-100 ring-green-400", activeColor: "bg-green-400", hover: "hover:bg-green-50" },
];

interface initialValueTypes {
    tags: number[];
    moodId: number
}

const initialValues: initialValueTypes = {
    tags: [],
    moodId: 3
}

function MoodRecorder() {
    const mutation = useRecordMood();

    const handleMoodRecord = (values: any) => {
        mutation.mutate(values);
    }

    return (
        <div className='w-full mx-auto'>
            <div className='bg-white rounded-xl border border-gray-200 shadow-custom overflow-hidden'>
                <Formik initialValues={initialValues} onSubmit={handleMoodRecord} validateOnChange={false} validateOnBlur={false}>
                    {({ values, isSubmitting }) => (
                        <Form className='flex items-center min-h-[100px]'>

                            <div className='w-1/3 flex justify-center items-center gap-2 p-4 border-b md:border-b-0 md:border-e border-gray-100'>
                                {moods.map((item) => {
                                    const isSelected = Number(values.moodId) === item.name;
                                    return (
                                        <label
                                            key={item.name}
                                            htmlFor={`mood${item.name}`}
                                            className={`
                                                relative cursor-pointer transition rounded-full p-1.5
                                                ${isSelected ? `${item.activeColor} shadow-lg scale-110` : `hover:scale-105 ${item.hover}`}
                                            `}
                                        >
                                            <img width={48} height={48} src={item.img} alt={`mood-${item.name}`} className={isSelected ? 'brightness-110' : 'opacity-80 hover:opacity-100'} />
                                            <Field hidden value={item.name} type="radio" id={`mood${item.name}`} name="moodId" />
                                        </label>
                                    );
                                })}
                            </div>

                            <div className='w-1/2 p-4 flex flex-wrap justify-center gap-1.5'>
                                <FieldArray name='tags' render={arrayHelpers => (
                                    <>
                                        {Tags.map((item, index) => {
                                            const tagId = index + 1;
                                            const isSelected = values.tags.includes(tagId);
                                            return (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            arrayHelpers.remove(values.tags.indexOf(tagId));
                                                        } else {
                                                            arrayHelpers.push(tagId);
                                                        }
                                                    }}
                                                    className={`
                                                        px-3 py-1 text-sm font-medium rounded-full border transition cursor-pointer
                                                        ${isSelected
                                                            ? "bg-yellow-500 border-yellow-500 text-white scale-105"
                                                            : "bg-white border-gray-200 text-gray-500 hover:border-yellow-300 hover:text-yellow-500"}
                                                    `}
                                                >
                                                    {item}
                                                </button>
                                            );
                                        })}
                                    </>
                                )} />
                            </div>

                            <div className='w-[15%] p-4 flex justify-center items-center border-s border-gray-100'>
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className=' relative p-3 bg-yellow-600 rounded-xl hover:bg-yellow-700 transition active:scale-90 disabled:opacity-50'
                                >
                                    <img src={save} alt="Save" className="w-8 h-8 brightness-0 invert transition-transform cursor-pointer" />
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default MoodRecorder;