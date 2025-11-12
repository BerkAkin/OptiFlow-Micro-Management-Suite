import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react';

interface addPaymentSubmitDAta {
    description: string,
    date: Date,
    to: string,
    quantity: number,
    isPartly: boolean,
    partCount?: number,
    partPrice?: number,
}


function AddPaymentForm() {

    const [IsPartly, setIsPartly] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [partCount, setPartCount] = useState<number>(0);
    const [partPrice, setPartPrice] = useState<number>(0);

    useEffect(() => {
        setTotalPrice(Number(partCount) * Number(partPrice));
    }, [partCount, partPrice]);

    const setPartCountHandler = (e: any) => {
        setPartCount(e.target.value)
        setTotalPrice(partCount * partPrice);
    }
    const setPartPriceHandler = (e: any) => {
        setPartPrice(e.target.value)
        setTotalPrice(partCount * partPrice);
    }

    const setIsPartlyHandler = () => {
        setIsPartly(!IsPartly);
    }

    const AddPaymentInitialS = {
        description: "",
        date: new Date(),
        to: "",
        quantity: 0,
        isPartly: false,
        partCount: 0,
        partPrice: 0,
    }

    const addPaymentSubmitHandler = (data: addPaymentSubmitDAta) => {
        alert("eklendi")
    }
    return (
        <div>
            <div className='w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 border-b border-x text-indigo-400 border-indigo-400 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Add Payment</p>
            </div>
            <Formik onSubmit={addPaymentSubmitHandler} initialValues={AddPaymentInitialS}>
                <Form>
                    <div className='h-[400px] '>

                        <div className='border-s'>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <div className=' h-[20%] p-2'>
                                        <Field className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="Description" name="description" ></Field>

                                    </div>
                                    <div className=' h-[20%] p-2'>
                                        <Field type="date" className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="Date" name="date" ></Field>

                                    </div>
                                    <div className=' h-[20%] p-2'>
                                        <Field className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="To Who" name="to" ></Field>

                                    </div>
                                    <div className=' h-[20%] p-2'>
                                        <Field className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="Quantity" name="quantity" ></Field>
                                    </div>
                                    <div className=' h-[20%] p-2'>
                                    </div>
                                </div>
                                <div>
                                    <div className=' h-[20%] p-2'>
                                        <div className="flex items-center gap-2 p-4">
                                            <input id="terms" type="checkbox" onChange={setIsPartlyHandler} className="w-5 h-5 text-blue-600 border-gray-300 rounded-sm" />
                                            <label htmlFor="terms" className="text-gray-600 text-lg">Is Partly?</label>
                                        </div>
                                    </div>

                                    <div className=' h-[20%] p-2'>
                                        {IsPartly && <Field onChange={(e: any) => setPartCountHandler(e)} value={partCount} className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="Part Count" name="partCount" ></Field>}
                                    </div>
                                    <div className=' h-[20%] p-2'>
                                        {IsPartly && <Field onChange={(e: any) => setPartPriceHandler(e)} value={partPrice} className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="Price of Part" name="partPrice" ></Field>}
                                    </div>
                                    <div className=' h-[20%] p-2'>
                                        {IsPartly && <p className="text-gray-700 bg-gray-200 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" >{totalPrice}</p>}
                                    </div>

                                </div>
                            </div>
                            <div className='p-2 flex justify-center'>
                                <button type='submit' className='text-center rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white h-[40px] w-[50%]'>Add</button>
                            </div>
                        </div>


                        <div>

                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddPaymentForm
