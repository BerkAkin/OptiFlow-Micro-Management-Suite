import { Field, Form, Formik } from 'formik'


interface FormValueTypes {
    description: string
}
const initialValues: FormValueTypes = {
    description: ""
}

const handleSubmit = (values: FormValueTypes) => {

}

function GetHelp() {
    return (
        <div className='h-[200px]'>
            <div className='w-full h-[10%] flex justify-center items-start'>
                <p className={`text-center px-4 text-lg text-white bg-red-400 rounded-b-sm font-roobert`}>Get Help (Anonymously)</p>
            </div>
            <div className='h-[90%]'>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    {({ isSubmitting, values }) => (
                        <Form className='h-full'>
                            <div className='h-[75%] flex items-center grid grid-cols-10 '>
                                <div className='col-span-4'>
                                    <div className='justify-center flex '>
                                        <label className=' text-xl mx-1 text-gray-700' htmlFor='description'>Describe the Issue:</label>
                                    </div>
                                </div>
                                <div className='col-span-6'>
                                    <div className='flex justify-start'>
                                        <Field rows={4} as="textarea" className="text-sm resize-none h-full border-b text-lg focus:outline-none w-[95%] bg-transparent focus:bg-transparent" name="description" placeholder="Temp description" />
                                    </div>

                                </div>
                            </div>
                            <div className='h-[25%] pb-5 flex justify-center items-center '>
                                <button type='submit' className='rounded-sm bg-red-400 hover:bg-red-500 text-white h-[40px] text-4xl w-36'>+</button>
                            </div>
                        </Form >
                    )}
                </Formik >
            </div>
        </div>
    )
}

export default GetHelp
