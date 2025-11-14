import { Field, Formik, Form } from 'formik';



function MakeSuggestionCard() {

    const handleSubmit = (values: any) => { alert("OK") }
    const initialValues = {
        topic: "",
        description: ""
    }

    return (
        <div className='absolute h-48 w-64 bg-white rounded-lg border shadow-lg z-20 left-1/2 transform -translate-x-1/2 top-16'>
            <div className='w-full h-[50px] flex justify-center items-start'>
                <p className={`text-center w-48 text-white bg-indigo-400 rounded-b-sm font-roobert`} >Make Suggestion</p>
            </div>
            <div>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='grid grid-cols-[40%_60%]'>
                                <div>
                                    <div className='justify-end flex '><label className=' text-lg mx-1 text-gray-700' htmlFor='topic'>Topic:</label></div>
                                    <div className='justify-end flex '><label className=' text-lg mx-1 text-gray-700' htmlFor='description'>Description:</label></div>
                                </div>
                                <div >
                                    <div>
                                        <Field className="border-b text-lg focus:outline-none w-[90%] bg-transparent focus:bg-transparent" name="topic" placeholder="Temp Topic" />
                                    </div>
                                    <div>
                                        <Field className="border-b text-lg focus:outline-none w-[90%] bg-transparent focus:bg-transparent" name="description" placeholder="Temp Description" />
                                    </div>
                                </div>


                            </div>
                            <div className='flex justify-center items-center '>
                                <button type='submit' className='my-5 rounded-sm bg-green-500 hover:bg-green-600 text-white h-[40px] text-4xl w-[75%]'>+</button>
                            </div>
                        </Form >
                    )}
                </Formik >
            </div>
        </div>
    )
}

export default MakeSuggestionCard
