import React, { useState } from 'react'
import happy from '../../../../src/assets/happy.svg'
import sad from '../../../../src/assets/sad.svg'
import verySad from '../../../../src/assets/verySad.svg'
import veryHappy from '../../../../src/assets/veryHappy.svg'
import neutral from '../../../../src/assets/neutral.svg'
import { Field, FieldArray, Form, Formik } from 'formik'


const MoodReasons = [
    "Work", "Friends", "Ergonomy", "Workload", "Health", "Sickness", "Psychology", "Family", "Sleep", "Tiredness", "Food", "Time", "Environment", "Weather"
]

const moods = [
    { name: "verySad", img: verySad, color: "red" },
    { name: "unhappy", img: sad, color: "orange" },
    { name: "neutral", img: neutral, color: "yellow" },
    { name: "smile", img: happy, color: "emerald" },
    { name: "happy", img: veryHappy, color: "green" },
];

interface initialValueTypes {
    selectedReasons: string[];
    moodSelect: string
}
const initialValues: initialValueTypes = {
    selectedReasons: [],
    moodSelect: ""
}

const handleMoodRecord = (values: any) => {
    console.log(values)
}

function MoodRecorder() {

    const [selectedMood, setSelectedMood] = useState<null | string>(null);


    return (
        <div className='grid'>
            <div className='bg-white rounded-lg border shadow-lg h-24 flex items-center'>

                <Formik initialValues={initialValues} onSubmit={handleMoodRecord}>
                    {({ isSubmitting, values }) => (
                        <Form className='grid grid-cols-10 '>
                            <div className='col-span-3 flex items-center border-e'>
                                {(moods).map((item) => (
                                    <label key={item.name} htmlFor={`mood${item.name}`} onClick={() => setSelectedMood(item.name)} className={`${values.moodSelect === item.name ? `bg-${item.color}-400` : ""} mx-2 cursor-pointer hover:bg-${item.color}-400 rounded-full p-1`} >
                                        <img width={60} src={item.img}></img>
                                        <Field hidden value={item.name} type="radio" id={`mood${item.name}`} name="moodSelect" />
                                    </label>
                                ))}
                            </div>


                            <div className='col-span-5 flex items-center border-e'>
                                <FieldArray name='selectedReasons' render={arrayHelpers => (
                                    <div className='grid grid-cols-8 gap-1'>
                                        {MoodReasons.map((item, key) => {
                                            const isSelected = values.selectedReasons.includes(item);
                                            return (
                                                <div className='col-span-1 flex items-center justify-center'>
                                                    <p className={` px-2 w-max border cursor-pointer hover:text-white hover:bg-indigo-300 rounded-lg ${isSelected ? "bg-indigo-400 text-white" : "text-gray-700 bg-white"}`}
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
                                <button type='submit' className='m-2 hover:bg-sky-500 rounded-sm bg-sky-400 text-white text-lg p-2'>Save Mood</button>
                            </div>
                        </Form>
                    )}
                </Formik>


            </div>
        </div>
    )
}

export default MoodRecorder
