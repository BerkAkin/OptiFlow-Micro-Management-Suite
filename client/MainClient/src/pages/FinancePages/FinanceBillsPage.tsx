import { Field, Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import add from '../../assets/add.svg'
import print from '../../assets/print.svg'
import { useInvoice } from '../../hooks/FinanceHooks/useFinance';

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
    email: string,
    personSerialNum: string,
    orderdate: string,
    invoicedate: string,
    products: productShape[],
}

function FinanceBillsPage() {
    const mutation = useInvoice();
    const [products, setProducts] = useState<productShape[]>([])
    const [isAdd, setIsAdd] = useState<boolean>(false);

    const initialValues = {
        firstname: "",
        lastname: "",
        address: "",
        phoneNum: "",
        email: "",
        personSerialNum: "",
        orderdate: "",
        invoicedate: "",
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

    const removeProduct = (index: number) => {
        setProducts(products.filter((_, i) => i !== index));
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

    const onSubmitHandler = async (values: invoiceFinal) => {
        const newJsonObject = {
            ...values,
            products: products.map(p => ({
                ...p,
                quantity: Number(p.quantity),
                price: Number(p.price)
            })),
            invoicedate: new Date().toISOString(),
        };

        mutation.mutate(newJsonObject);
    };

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
                        <div className='grid grid-cols-12 mt-10'>
                            <div className='col-span-9 flex border-b border-gray-200 justify-start'>
                            </div>
                            <div className='col-span-3 border-b border-gray-200'>
                                <p className='text-5xl text-gray-600 py-6 font-rubik' >FATURA</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-10 mt-5'>
                            <div className='col-span-5'><p></p></div>
                            <div className='col-span-5 text-end'>
                                <p className='text-gray-500'><span className='text-black'>Fatura Tarihi ve Saati: </span>{getCurrentDateTime()}</p>
                                <p className='text-gray-500'>
                                    <span className='text-black'>Sipariş Tarihi ve Saati: </span>
                                    <Field name="orderdate" type="datetime-local" className='cursor-pointer border border-gray-200 rounded-sm focus:outline-none' />
                                </p>

                            </div>
                        </div>

                        <div className='mt-10'>
                            <div className='text-gray-600 py-2 text-sm'>
                                <div>
                                    <p className='font-bold text-gray-700'>SAYIN</p>
                                </div>
                                <div className='flex space-x-4'>
                                    <Field className="cursor-pointer border border-gray-200 w-[50%] my-2 rounded-sm px-2 py-1 focus:outline-none" placeholder="First Name" name="firstname"></Field>
                                    <Field className="cursor-pointer border border-gray-200 w-[50%] my-2 rounded-sm px-2 py-1 focus:outline-none" placeholder="Last Name" name="lastname"></Field>
                                </div>
                                <div className='flex space-x-4 '>
                                    <Field className="cursor-pointer border border-gray-200 w-[50%] my-2 rounded-sm px-2 py-1 focus:outline-none" placeholder="Phone Number" name="phoneNum"></Field>
                                    <Field className="cursor-pointer border border-gray-200 w-[50%] my-2 rounded-sm px-2 py-1 focus:outline-none" placeholder="E-Mail" name="email"></Field>
                                </div>
                                <div className='flex space-x-4 '>
                                    <Field className="cursor-pointer border border-gray-200 w-[50%] my-2 rounded-sm px-2 py-1 focus:outline-none" placeholder="Serial Number (Person)" name="personSerialNum"></Field>
                                    <Field className="cursor-pointer border border-gray-200 w-[50%] my-2 rounded-sm px-2 py-1 focus:outline-none" placeholder="Addres" name="address"></Field>
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
                                        <th scope="col" className="px-6 ">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, index) => (
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
                                            <td onClick={() => removeProduct(index)} className="cursor-pointer text-red-500">X</td>
                                        </tr>
                                    ))}


                                </tbody>

                            </table>

                            <div className='flex justify-end my-5'>
                                <button type='button' onClick={() => setIsAdd(!isAdd)} className='cursor-pointer text-white px-2 '>
                                    <img src={add} width={30} alt='Add new product' />
                                </button>
                            </div>
                        </div>
                        <div className='mt-5 grid grid-cols-12'>
                            <div className='col-span-9 my-20 mx-10'>KAŞE İMZA</div>
                            <div className='col-span-3'>
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
                            <button type='submit' className='cursor-pointer text-white px-1'>
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
