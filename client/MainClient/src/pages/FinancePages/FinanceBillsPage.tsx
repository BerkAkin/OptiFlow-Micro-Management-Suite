import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

interface productShape {
    type: string,
    description: string,
    quantity: number,
    price: string,
    total: string,
}

interface invoiceFinal {
    firstname: string,
    lastname: string,
    address: string,
    phoneNum: string,
    fax: string,
    email: string,
    taxoffice: string,
    personserialnum: string,
    products: productShape[],
}

function FinanceBillsPage() {

    const [products, setProducts] = useState<productShape[]>([{ type: "Ürün 1", description: "Ürün 1 Açıklama", quantity: 1, price: "100", total: "100" }])
    const [isAdd, setIsAdd] = useState<boolean>(false);

    const initialValues = {
        firstname: "",
        lastname: "",
        address: "",
        phoneNum: "",
        fax: "",
        email: "",
        taxoffice: "",
        personserialnum: "",
        products: [],

    }

    const initalProductValues = {
        type: "",
        description: "",
        quantity: 1,
        price: "",
        total: "",
    }

    const onSubmitHandler = (values: invoiceFinal) => {
        const newJsonObject = {
            firstname: values.firstname,
            lastname: values.lastname,
            address: values.address,
            phoneNum: values.phoneNum,
            fax: values.fax,
            email: values.email,
            taxoffice: values.taxoffice,
            personserialnum: values.personserialnum,
            products: products
        }
        console.log(newJsonObject);
    }

    const onAddApproveHandler = (values: productShape) => {
        setProducts([...products, values])
        setIsAdd(!isAdd);
    }


    return (
        <div>
            {

                isAdd &&
                <div className=' w-[80%] h-[50%] absolute flex justify-center items-center'>
                    <div className='w-50 bg-white rounded-sm shadow-lg border'>
                        <Formik onSubmit={onAddApproveHandler} initialValues={initalProductValues}>
                            <Form>
                                <div><p className='text-gray-700 text-xl text-center p-5 font-roobert'>Add New Product</p></div>
                                <div>
                                    <Field className="text-gray-700 text-center p-3 border-b focus:outline-none  bg-transparent focus:bg-transparent" name="type" placeholder="Type" />
                                </div>
                                <div>
                                    <Field className="text-gray-700 text-center p-3 border-b focus:outline-none  bg-transparent focus:bg-transparent" name="description" placeholder="Description" />
                                </div>
                                <div>
                                    <Field className="text-gray-700 text-center p-3 border-b focus:outline-none  bg-transparent focus:bg-transparent" type="number" name="quantity" placeholder="Quantity" />

                                </div>
                                <div>
                                    <Field className="text-gray-700 text-center p-3 border-b focus:outline-none bg-transparent focus:bg-transparent" name="Price" placeholder="Price" />
                                </div >
                                <div>
                                    <Field className="text-gray-700 text-center p-3 border-b focus:outline-none  bg-transparent focus:bg-transparent" name="total" placeholder="Total" />
                                </div >
                                <button className='border bg-indigo-300 text-white p-2 hover:bg-indigo-400 w-full mt-5' type='submit'>Add</button>
                                <button onClick={() => setIsAdd(!isAdd)} className='border bg-red-300 text-white p-2 hover:bg-red-400 w-full mt-1'>Cancel</button>
                            </Form>
                        </Formik>
                    </div>
                </div>

            }

            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                <Form>
                    <div className=' container w-[900px] mx-auto my-10 bg-white shadow-md p-10'>
                        <div className='grid grid-cols-[70%_30%] mt-10'>
                            <div className='flex border-b justify-start'><p>*LOGO GELECEK*</p></div>
                            <div className='border-b'>
                                <p className='text-6xl text-gray-600 py-5 font-roobert' >INVOICE</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-[70%_30%] mt-5'>
                            <div className=''><p></p></div>
                            <div className='text-end'>
                                <p className='text-gray-500'><span className='text-black'>(OTO)Fatura Tarihi ve Saati: </span>25.10.2025</p>
                                <p className='text-gray-500'><span className='text-black'>(OTO)Sipariş Tarihi ve Saati: </span>25.10.2025</p>
                                <p className='text-gray-500'><span className='text-black'>(OTO)Seri Sıra No: </span>12345251255</p>
                                <p className='text-gray-500'><span className='text-black'>(OTO)Fatura No: </span>215562156215</p>

                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-10 mt-10 '>
                            <div className='text-gray-600 border-y py-2 border-gray-700 text-sm'>
                                <p>BERK AKIN BİLİŞİM HİZMETLERİ ANONİM ŞİRKETİ</p>
                                <p><span className='font-bold'>Merkez: </span> Mimar Sinan mah, Kocatepe Sok, No:24, Daire:32</p>
                                <p>Tel: 247184592234</p>
                                <p>Fax: 247184592234</p>
                                <p>E-Posta: biris@gmail.com</p>
                                <p>Vergi Dairesi: Kocaeli Körfez</p>
                                <p>VKN: 946214234</p>
                                <p>Mersis No: 4729-5122-4525-5325</p>
                                <p>Ticaret Sicil No: 472923-5</p>
                            </div>
                            <div className='text-gray-600 border-y py-2 border-gray-700  text-sm'>
                                <p className='font-bold text-gray-700'>SAYIN</p>
                                <div>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="First Name" name="firstname"></Field>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="Last Name" name="lastname"></Field>
                                </div>
                                <div>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="Addres" name="address"></Field>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="Tax Office" name="taxoffice"></Field>

                                </div>
                                <div>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="Phone Number" name="phoneNum"></Field>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="Fax Number" name="fax"></Field>
                                </div>
                                <div>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="E-Mail" name="email"></Field>
                                    <Field className="text-gray-700 text-center p-2 mx-2 border-b focus:outline-none  bg-transparent focus:bg-transparent" placeholder="Serial Number (Person)" name="personserialnum"></Field>
                                </div>


                            </div>
                        </div>



                        <div className='mt-20'>

                            <table className="w-full border">
                                <thead className="bg-gray-300 font-roobert">
                                    <tr>
                                        <th scope="col" className="px-6 ">
                                            Cinsi
                                        </th>
                                        <th scope="col" className="px-6 ">
                                            Açıklama
                                        </th>
                                        <th scope="col" className="px-6 ">
                                            Miktar
                                        </th>
                                        <th scope="col" className="px-6 ">
                                            Fiyat
                                        </th>
                                        <th scope="col" className="px-6 ">
                                            Tutar
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item) => (
                                        <tr className="bg-white border-b text-sm text-gray-600">
                                            <th scope="row" className="px-6">
                                                {item.type}
                                            </th>
                                            <td className="px-6 py-2  text-center">
                                                {item.description}
                                            </td>
                                            <td className="px-6 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 text-center">
                                                {item.price}
                                            </td>
                                            <td className="px-6 text-center">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>

                            </table>

                            <div className='flex justify-end my-5'>
                                <button onClick={() => setIsAdd(!isAdd)} className='border bg-indigo-300 text-white p-2 hover:bg-indigo-400'>Add New Product</button>
                            </div>
                        </div>
                        <div className='mt-5 grid grid-cols-[80%_20%]'>
                            <div className='my-20 mx-10'>KAŞE İMZA</div>
                            <div>
                                <div className='my-5'>
                                    <p className='text-gray-500'><span className='text-black'>Toplam: </span></p>
                                </div>
                                <div className='my-5'>
                                    <p className='text-gray-500'><span className='text-black'>KDV % : </span>10</p>
                                </div>
                                <div className='my-5'>
                                    <p className='text-gray-500'><span className='text-black'>Genel Toplam: </span>5390 TL</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => onSubmitHandler} className='border bg-green-600 text-white p-2 hover:bg-green-700'>Create Invoice</button>
                        </div>


                    </div>
                </Form>
            </Formik>

        </div>
    )
}

export default FinanceBillsPage
