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
                <div className='fixed inset-0 bg-gray-900/30 flex justify-center items-center'>
                    <div className='w-82 bg-white rounded-lg shadow-lg border'>
                        <Formik onSubmit={onAddApproveHandler} initialValues={initalProductValues}>
                            <Form>
                                <div className='w-full h-[50px] flex justify-center items-start'>
                                    <p className={`text-2xl text-center px-2 text-white bg-sky-400 rounded-b-sm font-roobert`} >Add Product</p>
                                </div>
                                <div className='grid grid-cols-10 mt-2'>
                                    <div className='col-span-4'>
                                        <div className='h-[20%] flex items-center justify-center'><label className='my-2 text-lg text-gray-700' htmlFor='type'>Type:</label></div>
                                        <div className='h-[20%] flex items-center justify-center'><label className='my-2 text-lg text-gray-700' htmlFor='description'>Description:</label></div>
                                        <div className='h-[20%] flex items-center justify-center'><label className='my-2 text-lg text-gray-700' htmlFor='quantity'>Quantity:</label></div >
                                        <div className='h-[20%] flex items-center justify-center'><label className='my-2 text-lg text-gray-700' htmlFor='Price'>Price:</label></div>
                                        <div className='h-[20%] flex items-center justify-center'><label className='my-2 text-lg text-gray-700' htmlFor='total'>Total:</label></div>

                                    </div >
                                    <div className='col-span-6'>
                                        <div className='h-[20%] flex items-center '>
                                            <Field className="text-gray-700 text-center mx-4 w-full px-2 border-b focus:outline-none" name="type" placeholder="Temp Type" />
                                        </div>
                                        <div className='h-[20%] flex items-center'>
                                            <Field className="text-gray-700 text-center mx-4 w-full px-2 border-b focus:outline-none " name="description" placeholder="Temp Description" />
                                        </div>
                                        <div className='h-[20%] flex items-center'>
                                            <Field className="text-gray-700 text-center mx-4 w-full px-2 border-b focus:outline-none " type="number" name="quantity" placeholder="Temp Quantity" />
                                        </div>
                                        <div className='h-[20%] flex items-center'>
                                            <Field className="text-gray-700 text-center mx-4 w-full px-2 border-b focus:outline-none" name="price" placeholder="Temp Price" />
                                        </div>
                                        <div className='h-[20%] flex items-center'>
                                            <Field className="text-gray-700 text-center mx-4 w-full px-2 border-b focus:outline-none" name="total" placeholder="Temp Total" />
                                        </div >
                                    </div>
                                </div >
                                <div className='flex justify-evenly my-5 items-center'>
                                    <button onClick={() => setIsAdd(!isAdd)} className='bg-red-400 text-white p-2 ms-4 hover:bg-red-500 w-[40%] '>Cancel</button>
                                    <button className='bg-green-500 text-white p-2 hover:bg-green-600 w-[60%] mx-4' type='submit'>Add</button>
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>

            }

            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                <Form>
                    <div className=' container w-[900px] mx-auto my-10 bg-white shadow-md p-10'>
                        <div className='grid grid-cols-10 mt-10'>
                            <div className='col-span-7 flex border-b justify-start'><p>*LOGO GELECEK*</p></div>
                            <div className='col-span-3 border-b'>
                                <p className='text-6xl text-gray-600 py-5 font-roobert' >INVOICE</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-10 mt-5'>
                            <div className='col-span-7'><p></p></div>
                            <div className='col-span-3 text-end'>
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
                                <button onClick={() => setIsAdd(!isAdd)} className=' bg-sky-400 text-white p-2 hover:bg-sky-500'>Add New Product</button>
                            </div>
                        </div>
                        <div className='mt-5 grid grid-cols-10'>
                            <div className='col-span-8 my-20 mx-10'>KAŞE İMZA</div>
                            <div className='col-span-2'>
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
                            <button onClick={() => onSubmitHandler} className=' bg-green-600 text-white p-2 hover:bg-green-700'>Create Invoice</button>
                        </div>


                    </div>
                </Form>
            </Formik>

        </div>
    )
}

export default FinanceBillsPage
