import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react';
import DynamicForm from '../../DynamicForm/DynamicForm';



function AddPaymentForm() {

    const [IsPartly, setIsPartly] = useState<boolean>(false);

    const setIsPartlyHandler = () => {
        setIsPartly(!IsPartly);
    }

    const handleSubmit = (data: any) => {
        console.log(data)
    }

    const initialValues = {
        description: "",
        date: new Date().toISOString().split("T")[0],
        to: "",
        quantity: 0,
        isPartly: false,
        partCount: 0,
        partPrice: 0,
    }

    const fields = [
        { name: "description", label: "Description", id: "description", type: "text" as const, placeholder: "Description..." },
        { name: "to", label: "To", id: "to", type: "text" as const, placeholder: "To..." },
        { name: "date", label: "Date", id: "date", type: "date" as const, placeholder: "" },
        { name: "quantity", label: "quantity", id: "quantity", type: "number" as const, placeholder: "1" },


    ]
    return (
        <div>
            <DynamicForm colorScheme='bg-orange-400' hoverScheme='hover:bg-orange-500' fields={fields} initialValues={initialValues} onSubmit={handleSubmit} title='Add Payment' >
                <div>
                    <div>

                        <label className='my-3 text-lg text-gray-700' htmlFor='terms'>Partly? </label>
                        <input id="terms" type="checkbox" onChange={setIsPartlyHandler} className=" border-gray-300 rounded-sm" />
                    </div>
                    <div className='h-[75px]'>
                        {IsPartly &&
                            <div>
                                <label className={`${IsPartly ? "text-gray-700" : "text-gray-400"} my-3 text-lg`} htmlFor='partCount'>Part Count</label>
                                <Field type="number" className="border border-gray-200 w-full rounded-sm px-2 py-1 focus:outline-none" placeholder="Part Count" name="partCount" />
                            </div>
                        }
                    </div>
                    <div className='h-[75px]'>
                        {IsPartly &&
                            <div>
                                <label className={`${IsPartly ? "text-gray-700" : "text-gray-400"} my-3 text-lg`} htmlFor='partPrice'>Part Price</label>
                                <Field type="number" className="border border-gray-200 w-full rounded-sm px-2 py-1 focus:outline-none" placeholder="Price of Part" name="partPrice" />
                            </div>
                        }

                    </div>

                </div>

            </DynamicForm>

        </div>
    )
}

export default AddPaymentForm
