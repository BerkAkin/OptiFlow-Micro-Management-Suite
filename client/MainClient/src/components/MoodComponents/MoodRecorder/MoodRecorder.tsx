import happy from '../../../../src/assets/happy.svg'
import sad from '../../../../src/assets/sad.svg'
import verySad from '../../../../src/assets/verySad.svg'
import veryHappy from '../../../../src/assets/veryHappy.svg'
import neutral from '../../../../src/assets/neutral.svg'
import save from '../../../assets/save.svg'
import { Field, FieldArray, Form, Formik } from 'formik'


const MoodReasons = [
    "Work", "Friends", "Ergonomy", "Workload", "Health", "Sickness", "Psychology", "Family", "Sleep", "Tiredness", "Food", "Time", "Environment", "Weather"
]

const moods = [
    { name: 1, img: verySad, color: "bg-red-400", hover: "hover:bg-red-400" },
    { name: 2, img: sad, color: "bg-orange-400", hover: "hover:bg-orange-400" },
    { name: 3, img: neutral, color: "bg-yellow-400", hover: "hover:bg-yellow-400" },
    { name: 4, img: happy, color: "bg-emerald-400", hover: "hover:bg-emerald-400" },
    { name: 5, img: veryHappy, color: "bg-green-400", hover: "hover:bg-green-400" },
];

interface initialValueTypes {
    selectedReasons: string[];
    moodSelect: number
}
const initialValues: initialValueTypes = {
    selectedReasons: [],
    moodSelect: 0
}

const handleMoodRecord = (values: any) => {
    console.log(values)
}

function MoodRecorder() {

    return (
        <div className='grid'>
            <div className='bg-white rounded-lg border border-gray-200 shadow-custom h-24 flex items-center'>

                <Formik initialValues={initialValues} onSubmit={handleMoodRecord}>
                    {({ isSubmitting, values }) => (
                        <Form className='grid grid-cols-10 '>
                            <div className='col-span-3 flex items-center border-e border-gray-200'>
                                {(moods).map((item) => (
                                    <label key={item.name} htmlFor={`mood${item.name}`} className={`${Number(values.moodSelect) === item.name ? `${item.color}` : ""} mx-2 cursor-pointer ${item.hover} rounded-full p-1`} >
                                        <img width={60} src={item.img}></img>
                                        <Field className="cursor-pointer" hidden value={item.name} type="radio" id={`mood${item.name}`} name="moodSelect" />
                                    </label>
                                ))}
                            </div>


                            <div className='col-span-5 flex items-center border-e border-gray-200'>
                                <FieldArray name='selectedReasons' render={arrayHelpers => (
                                    <div className='grid grid-cols-8 gap-1'>
                                        {MoodReasons.map((item, key) => {
                                            const isSelected = values.selectedReasons.includes(item);
                                            return (
                                                <div className='col-span-1 flex items-center justify-center'>
                                                    <p className={` px-2 w-max border border-gray-200 cursor-pointer hover:text-white hover:bg-indigo-300 rounded-lg ${isSelected ? "bg-indigo-400 text-white" : "text-gray-700 bg-white"}`}
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                arrayHelpers.remove(values.selectedReasons.indexOf(item));
                                                            } else {
                                                                arrayHelpers.push(item)
                                                            }
                                                        }}>
                                                        {item}
                                                    </p>
                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                )} />
                            </div>
                            <div className='col-span-2 flex items-center justify-center'>
                                <button type='submit' className='cursor-pointer'><img src={save} alt="" width={50} /></button>
                            </div>
                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    )
}

export default MoodRecorder
