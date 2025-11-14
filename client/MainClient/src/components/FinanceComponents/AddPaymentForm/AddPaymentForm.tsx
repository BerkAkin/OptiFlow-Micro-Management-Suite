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
        <div className='h-[450px]'>
            <div className='w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 text-white bg-orange-400 rounded-b-sm font-roobert`}>Add Payment</p>
            </div>
            <Formik onSubmit={addPaymentSubmitHandler} initialValues={AddPaymentInitialS}>
                <Form>

                    <div className='grid grid-cols-[40%_60%]'>
                        <div>
                            <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='description'>Description:</label></div>
                            <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='to'>To:</label></div >
                            <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='date'>Date:</label></div>
                            <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='quantity'>Description:</label></div>
                            <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='terms'>Partly? </label></div>
                            <div className='h-[10%] flex items-center justify-end'> <label className={`${IsPartly ? "text-gray-700" : "text-gray-400"} my-3 text-lg`} htmlFor='partCount'>Part Count:</label></div>
                            <div className='h-[10%] flex items-center justify-end'> <label className={`${IsPartly ? "text-gray-700" : "text-gray-400"} my-3 text-lg`} htmlFor='partPrice'>Part Price:</label></div>
                            <div className='h-[10%] flex items-center justify-end'> <label className={`${IsPartly ? "text-gray-700" : "text-gray-400"} my-3 text-lg`} >Total:</label></div>

                        </div >
                        <div>
                            <div className='h-[10%] flex items-center'>
                                <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" placeholder="Temp Desc" name="description" ></Field>
                            </div>
                            <div className='h-[10%] flex items-center'>
                                <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" placeholder="Berk" name="to" ></Field>
                            </div>
                            <div className='h-[10%] flex items-center'>
                                <Field type="date" className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" placeholder="Date" name="date" ></Field>
                            </div>
                            <div className='h-[10%] flex items-center'>
                                <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" placeholder="1" name="quantity" ></Field>
                            </div>
                            <div className='h-[10%] flex items-center ps-2'>
                                <input id="terms" type="checkbox" onChange={setIsPartlyHandler} className=" border-gray-300 rounded-sm" />
                            </div>
                            <div className='h-[10%] flex items-center'>
                                {IsPartly && <Field onChange={(e: any) => setPartCountHandler(e)} value={partCount} className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" placeholder="Part Count" name="partCount" ></Field>}
                            </div>
                            <div className='h-[10%] flex items-center'>
                                {IsPartly && <Field onChange={(e: any) => setPartPriceHandler(e)} value={partPrice} className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" placeholder="Price of Part" name="partPrice" ></Field>}
                            </div>
                            <div className='h-[10%] flex items-center'>
                                {IsPartly && <p className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" >{totalPrice}</p>}
                            </div>
                            <div className='h-[20%] flex items-start'>
                                <button type='submit' className='text-center mt-4 rounded-sm bg-orange-400 hover:bg-orange-500 text-4xl text-white h-[40px] w-[50%]'>+</button>
                            </div>
                        </div>
                    </div>




                </Form>
            </Formik>
        </div>
    )
}

export default AddPaymentForm
