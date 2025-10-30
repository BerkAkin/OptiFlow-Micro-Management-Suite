import Calendar from '../../components/FinanceComponents/Calendar/Calendar'
import TodaysPaymentsCard from '../../components/FinanceComponents/TodayPaymentCard/TodaysPaymentsCard'
import RecurrentPaymentsCard from '../../components/FinanceComponents/RecurrentAndInstallPaymentsCard/RecurrentPaymentsCard'
import InstallmentPaymentsCard from '../../components/FinanceComponents/InstallmentPaymentsCard/InstallmentPaymentsCard'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'


interface addPaymentSubmitDAta {
    description: string,
    date: Date,
    to: string,
    quantity: number,
    isPartly: boolean,
    partCount?: number,
    partPrice?: number,
}

function FinancePaymentsPage() {

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
            <div className='container mx-auto mt-10 grid grid-cols-2 gap-5'>
                <div className='w-full bg-white p-5 border shadow-md'>
                    <div className='w-full bg-white border shadow-sm h-full'>
                        <Formik onSubmit={addPaymentSubmitHandler} initialValues={AddPaymentInitialS}>
                            <Form>
                                <div className='h-[400px] grid grid-cols-2'>

                                    <div className='justify-center flex items-center h-[400px]'>
                                        <p className='text-4xl text-gray-600' style={{ fontFamily: "roobert" }}>ADD NEW PAYMENT</p>
                                    </div>
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
                                                    {IsPartly && <Field onChange={(e: any) => setPartPriceHandler(e)} value={partPrice} className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" placeholder="Price of One Part" name="partPrice" ></Field>}
                                                </div>
                                                <div className=' h-[20%] p-2'>
                                                    {IsPartly && <p className="text-gray-700 bg-gray-200 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent border-b" >{totalPrice}</p>}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='p-2'>
                                            <button type='submit' className='border p-2 bg-green-600 hover:bg-green-700 text-white rounded-sm w-full text-xl'>ADD</button>
                                        </div>
                                    </div>


                                    <div>

                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                </div>


            </div>



            <div className='container mx-auto h-[700px] p-5 bg-white shadow-md mt-10 grid grid-cols-2 flex justify-center gap-5'>



                <div className='bg-white shadow-sm border p-5'>
                    <Calendar />
                </div>

                <div className='bg-white shadow-sm border'>
                    <div className='w-full h-[10%] text-center flex justify-center items-start'>
                        <p className={`text-2xl text-center w-64 bg-sky-400 text-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Remaining Payments</p>
                    </div>
                    <div className='h-[80%]'>
                        <table className="w-full h-[100%] text-md text-left text-gray-700 border-b">
                            <thead className="text-gray-700  uppercase h-[10%] border-b">
                                <tr>
                                    <th scope="col" className="px-6">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 text-center">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 text-center">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 text-center">
                                        Customer/Enterprise
                                    </th>
                                    <th scope="col" className="px-6 text-ccdenter">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Kronolij olarak sırlaancaklar  kalan ödemeler 1 aylık periyot*/}
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <tr className="bg-white  hover:bg-gray-100">

                                        <td className="px-6 py-2 text-xs">
                                            Son ay yapılan ödemelerin vergi iadesi
                                        </td>
                                        <td className="px-6 py-2 text-sm text-xs">
                                            5000
                                        </td>
                                        <td className="px-6 text-sm text-center">
                                            Giyim
                                        </td>
                                        <td className="px-6 text-sm text-center">
                                            Berk Akın
                                        </td>
                                        <td className="px-6 text-sm text-center">
                                            29.10.2025
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='h-[10%] grid grid-cols-[75%_25%]'>
                        {/* formik ile filtreleme eklenecek filtreli veriler statee gelecek */}
                        <div className='border-e'>
                            <select className='ps-5 w-full h-full focus:outline-none focus:border-none text-md text-gray-700'>
                                <option selected={true}>Select Filter</option>
                                <option value={"By Customer"}>By Customer</option>
                                <option value={"By Date"}>By Date</option>
                                <option value={"By Category"}>By Category</option>
                            </select>
                        </div>
                        <div className='flex items-center justify-end'>
                            <button className='rounded-sm bg-indigo-400 hover:bg-indigo-500 text-white w-[50%] mx-2 p-2'>{"🡸"}</button>
                            <button className='rounded-sm bg-indigo-400 hover:bg-indigo-500 text-white w-[50%] mx-2 p-2'>{"🡺"}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto h-[500px] grid grid-cols-2 p-5 gap-5 bg-white shadow-md my-5 flex justify-center'>

                <div className='bg-white shadow-sm h-full max-h-[500px] border'>
                    <div className='w-full h-[50px] text-center flex justify-center items-start'>
                        <p className={`text-2xl text-center w-64  bg-amber-600 text-white rounded-b-md  `} style={{ fontFamily: "roobert" }}>Today's Payments</p>
                    </div>
                    <div className='border-b h-12 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center uppercase'>
                        <div>
                            <p className={`text-md font-bold text-start ps-5 w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Description</p>
                        </div>
                        <div>
                            <p className={`text-md font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>To Who</p>
                        </div>
                        <div>
                            <p className={`text-md font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Price</p>
                        </div>
                        <div>
                            <p className={`text-md font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Pay</p>
                        </div>
                    </div>
                    <div className='max-h-[350px] h-full overflow-y-scroll'>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <>
                                <TodaysPaymentsCard Description='lorem ipsum dolor ist amet' Price='500$' ToWho='Berk' />
                            </>
                        ))}

                    </div>
                </div>
                <div className='bg-white h-full max-h-[500px] grid grid-cols-[40%_60%] gap-3'>
                    <div className='bg-white shadow-sm h-full max-h-full border '>
                        <div className='w-full h-[50px] text-center flex justify-center items-start'>
                            <p className={`text-2xl text-center w-64  bg-amber-400 text-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Recurrent Payments</p>
                        </div>
                        <div className='max-h-[400px] h-full overflow-y-scroll'>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <>
                                    <RecurrentPaymentsCard Description='lorem ipsum dolor ist ametlorem ipsum dolor ist ametlorem ipsum dolor ist ametlorem ipsum dolor ist ametlorem ipsum dolor ist amet' Price='500$' />
                                </>
                            ))}

                        </div>
                    </div>
                    <div className='bg-white shadow-sm h-full max-h-full border '>
                        <div className='w-full h-[50px] text-center flex justify-center items-start'>
                            <p className={`text-2xl text-center w-64  bg-red-400 text-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Installment Payments</p>
                        </div>
                        <div className='max-h-[400px] h-full overflow-y-scroll'>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <>
                                    <InstallmentPaymentsCard RemainingPart='2/3' Detail='ID1' Description='lorem ipsum dolor ist ametlorem ipsum dolor ist ametlorem ipsum dolor ist ametlorem ipsum dolor ist ametlorem ipsum dolor ist amet' Price='500$' />
                                </>
                            ))}

                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default FinancePaymentsPage
