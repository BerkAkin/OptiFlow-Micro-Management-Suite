import { Field, Form, Formik } from 'formik'


interface FormValueTypes {
    description: string
}
const initialValues: FormValueTypes = {
    description: ""
}

const handleSubmit = (values: FormValueTypes) => {

}

function RateOthers() {
    return (
        <div className='h-[200px] grid grid-cols-10 gap-5'>
            <div className='col-span-5  shadow-lg border rounded-lg bg-white'>
                <div className='w-full h-[10%] flex justify-center items-start'>
                    <p className={`text-center px-4 text-lg text-white bg-sky-400 rounded-b-sm font-roobert`}>Rate Others</p>
                </div>
                <div className='h-[90%]'>
                    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                        {({ isSubmitting, values }) => (
                            <Form className='h-full'>
                                <div className='h-[75%] flex items-center grid grid-cols-10 '>
                                    <div className='h-[50%] col-span-4'>
                                        <div className='justify-end flex items-center'>
                                            <label className=' text-lg mx-1 text-gray-700' htmlFor='description'>Employee: </label>
                                        </div>
                                        <div className='justify-end flex items-center'>
                                            <label className=' text-lg mx-1 text-gray-700' htmlFor='description'>Rate: </label>
                                        </div>
                                    </div>
                                    <div className='h-[50%] col-span-6'>
                                        <div className='flex justify-start items-center'>
                                            <select className='border-none focus:border-none focus:outline-none border-b w-[90%] text-lg text-gray-700' name="selectEmployee" id="selectEmployee">
                                                <option value="select">select employee</option>
                                                <option value="berkAkin">Berk Akın</option>
                                            </select>
                                        </div>
                                        <div className='flex justify-start items-center mt-1'>
                                            give Star kısmı
                                        </div>

                                    </div>
                                </div>
                                <div className='h-[25%] flex justify-center items-center pb-5'>
                                    <button type='submit' className='rounded-sm bg-sky-400 hover:bg-sky-500 text-white h-[40px] text-4xl w-36'>+</button>
                                </div>
                            </Form >
                        )}
                    </Formik >
                </div>
            </div>
            <div className='col-span-2 shadow-lg border rounded-lg bg-white'>
                <div className='w-full h-[15%] flex justify-center items-start'>
                    <p className={`text-center px-4 text-lg text-white bg-orange-400 rounded-b-sm font-roobert`}>My Score</p>
                </div>
                <div className='h-[50%] flex justify-center items-center'>
                    <p className={`text-7xl pt-4 text-amber-500`}>★</p>
                </div>
                <div className='h-[25%] flex justify-center items-start'>
                    <p className={`text-4xl text-amber-500`}>4.7</p>
                </div>
            </div>
        </div>
    )
}

export default RateOthers
