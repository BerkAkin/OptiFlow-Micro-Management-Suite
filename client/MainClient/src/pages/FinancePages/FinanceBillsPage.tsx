import { Field, Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import add from '../../assets/add.svg'
import print from '../../assets/print.svg'

interface productShape {
    category: string,
    description: string,
    quantity: number,
    price: string,
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

    const [products, setProducts] = useState<productShape[]>([])
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
        category: "",
        description: "",
        quantity: "",
        price: "",
    }


    const onAddApproveHandler = (values: productShape) => {
        setProducts([...products, values])
        setIsAdd(!isAdd);
    }


    const calculateSubTotal = (products: productShape[]) => {
        return products.reduce((sum, item) => {
            const price = Number(item.price) || 0
            const quantity = Number(item.quantity) || 0
            return sum + price * quantity
        }, 0)
    }

    const calculateTax = (subTotal: number, taxRate: number) => {
        return subTotal * taxRate / 100
    }

    const calculateGrandTotal = (subTotal: number, tax: number) => {
        return subTotal + tax
    }

    const getCurrentDateTime = () => {
        return new Date().toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
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

    const fields = [
        { name: "category", id: "category", type: "text" as const, label: "Category", placeholder: "Category" },
        { name: "description", id: "description", type: "text" as const, label: "Description", placeholder: "Description" },
        { name: "quantity", id: "quantity", type: "text" as const, label: "Quantity", placeholder: "Quantity" },
        { name: "price", id: "price", type: "text" as const, label: "Price", placeholder: "Price" },
    ]

    const taxRate = 10
    const subTotal = useMemo(() => calculateSubTotal(products), [products])
    const taxAmount = useMemo(() => calculateTax(subTotal, taxRate), [subTotal])
    const grandTotal = useMemo(() => calculateGrandTotal(subTotal, taxAmount), [subTotal, taxAmount])
    return (
        <div>
            {
                isAdd &&
                <div className='fixed inset-0 bg-gray-900/30 flex justify-center items-center'>
                    <div className='bg-white rounded-lg shadow-custom border border-gray-200 h-[300px] w-72'>
                        <DynamicForm colorScheme='bg-gray-400' hoverScheme='hover:bg-gray-500' fields={fields} initialValues={initalProductValues} onCancel={() => setIsAdd(!isAdd)} onSubmit={onAddApproveHandler} title='Add Product' />
                    </div>
                </div>
            }

            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                <Form>
                    <div className='w-[900px] mx-auto my-10 bg-white shadow-custom border border-gray-200 p-10'>
                        <div className='grid grid-cols-10 mt-10'>
                            <div className='col-span-7 flex border-b border-gray-200 justify-start'><p>*LOGO GELECEK*</p></div>
                            <div className='col-span-3 border-b border-gray-200'>
                                <p className='text-6xl text-gray-600 py-5 font-rubik' >INVOICE</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-10 mt-5'>
                            <div className='col-span-5'><p></p></div>
                            <div className='col-span-5 text-end'>
                                <p className='text-gray-500'><span className='text-black'>Fatura Tarihi ve Saati: </span>{getCurrentDateTime()}</p>
                                <p className='text-gray-500'><span className='text-black'>Sipariş Tarihi ve Saati: </span>{getCurrentDateTime()}</p>

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
                                <div className='space-x-5 space-y-2'>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="First Name" name="firstname"></Field>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="Last Name" name="lastname"></Field>
                                </div>
                                <div className='space-x-5 space-y-2'>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="Addres" name="address"></Field>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="Tax Office" name="taxoffice"></Field>

                                </div>
                                <div className='space-x-5 space-y-2'>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="Phone Number" name="phoneNum"></Field>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="Fax Number" name="fax"></Field>
                                </div>
                                <div className='space-x-5 space-y-2'>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="E-Mail" name="email"></Field>
                                    <Field className="cursor-pointer border border-gray-200 rounded-sm px-2 py-1 focus:outline-none" placeholder="Serial Number (Person)" name="personserialnum"></Field>
                                </div>


                            </div>
                        </div>



                        <div className='mt-20'>

                            <table className="w-full border border-gray-200">
                                <thead className="bg-gray-300 font-rubik">
                                    <tr>
                                        <th scope="col" className="px-6 ">
                                            Kategori
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
                                        <tr className="bg-white border-b border-gray-200 text-sm text-gray-600">
                                            <th scope="row" className="px-6">
                                                {item.category}
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
                                                {Number(item.price) * Number(item.quantity)}
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>

                            </table>

                            <div className='flex justify-end my-5'>
                                <button onClick={() => setIsAdd(!isAdd)} className='cursor-pointer text-white px-2 '>
                                    <img src={add} width={30} alt='Add new product' />
                                </button>
                            </div>
                        </div>
                        <div className='mt-5 grid grid-cols-10'>
                            <div className='col-span-8 my-20 mx-10'>KAŞE İMZA</div>
                            <div className='col-span-2'>
                                <div className='my-5'>
                                    <p className='text-gray-500'><span className='text-black'>Toplam: </span>{subTotal} ₺</p>
                                </div>
                                <div className='my-5'>
                                    <p className='text-gray-500'><span className='text-black'>KDV % : </span>{taxRate}</p>
                                </div>
                                <div className='my-5'>
                                    <p className='text-gray-500'><span className='text-black'>Genel Toplam: </span> {grandTotal} ₺</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => onSubmitHandler} className='cursor-pointer text-white px-1'>
                                <img src={print} alt='Create invoice' width={35} />
                            </button>
                        </div>


                    </div>
                </Form>
            </Formik>

        </div >
    )
}

export default FinanceBillsPage
