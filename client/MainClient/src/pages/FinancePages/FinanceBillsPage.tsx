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
        { name: "category", id: "category", type: "text" as const, label: "Category", placeholder: "Electronics, Food..." },
        { name: "description", id: "description", type: "text" as const, label: "Description", placeholder: "Product Detail" },
        { name: "quantity", id: "quantity", type: "text" as const, label: "Amount", placeholder: "0" },
        { name: "price", id: "price", type: "text" as const, label: "Price", placeholder: "0.00" },
    ]

    const taxRate = 20
    const subTotal = useMemo(() => calculateSubTotal(products), [products])
    const taxAmount = useMemo(() => calculateTax(subTotal, taxRate), [subTotal])
    const grandTotal = useMemo(() => calculateGrandTotal(subTotal, taxAmount), [subTotal, taxAmount])

    const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder:text-gray-300";

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 ">
            {isAdd && (
                <div className='fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center z-100 transition'>
                    <div className='bg-white rounded-xl shadow-custom border border-gray-200 overflow-hidden w-96 transform transition'>
                        <div className="p-2">
                            <DynamicForm
                                colorScheme='bg-blue-600'
                                hoverScheme='hover:bg-blue-700'
                                fields={fields}
                                initialValues={initalProductValues}
                                onCancel={() => setIsAdd(!isAdd)}
                                onSubmit={onAddApproveHandler}
                                title='Add Product'
                            />
                        </div>
                    </div>
                </div>
            )}

            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                <Form>
                    <div className='max-w-[1000px] mx-auto bg-white shadow-custom rounded-xl border border-gray-200 p-8 relative overflow-hidden'>


                        <div className='flex justify-between items-center mb-12'>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Invoice Template</h1>
                                <p className="text-sm text-gray-400 mt-1">Operation Number: #INV-{Math.floor(Math.random() * 10000)}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-5xl font-black text-gray-300 tracking-tighter font-rubik relative'>INVOICE</p>
                            </div>
                        </div>

                        <div className='flex justify-end mb-10'>
                            <div className='bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3 min-w-[300px]'>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-gray-500 uppercase">Invoice Date:</span>
                                    <span className="text-sm text-gray-800 font-medium">{getCurrentDateTime()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-gray-500 uppercase">Order Date:</span>
                                    <Field name="orderdate" type="datetime-local" className="bg-transparent text-sm border-b border-gray-300 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className='mb-12'>
                            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Customer Details</h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <Field className={inputClass} placeholder="First Name" name="firstname" />
                                        <Field className={inputClass} placeholder="Last Name" name="lastname" />
                                    </div>
                                    <Field className={inputClass} placeholder="Personal Serial Number" name="personSerialNum" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <Field className={inputClass} placeholder="Phone Number" name="phoneNum" />
                                        <Field className={inputClass} placeholder="E-Mail" name="email" />
                                    </div>
                                    <Field className={inputClass} placeholder="Adress" name="address" />
                                </div>
                            </div>
                        </div>

                        <div className='mt-8 rounded-lg border border-gray-200 overflow-hidden'>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4 text-center">Amount</th>
                                        <th className="px-6 py-4 text-center">Price</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                        <th className="px-6 py-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.length > 0 ? products.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">{item.category}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                                            <td className="px-6 py-4 text-sm text-center font-mono">{item.quantity}</td>
                                            <td className="px-6 py-4 text-sm text-center font-mono">{Number(item.price).toLocaleString('tr-TR')} ₺</td>
                                            <td className="px-6 py-4 text-sm text-right font-bold text-gray-800">
                                                {(Number(item.price) * Number(item.quantity)).toLocaleString('tr-TR')} ₺
                                            </td>
                                            <td className="px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="text-red-300 hover:text-red-600 transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                                                No products has been added...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className='p-4 bg-gray-50 flex justify-center border-t border-gray-200'>
                                <button
                                    type='button'
                                    onClick={() => setIsAdd(!isAdd)}
                                    className='flex items-center gap-2 text-sm font-bold text-blue-600 transition-all px-6 py-2 cursor-pointer'
                                >
                                    <img src={add} width={20} alt='Add' />
                                    Add Product
                                </button>
                            </div>
                        </div>

                        <div className='mt-12 grid grid-cols-1 md:grid-cols-12 gap-8'>
                            <div className='col-span-8 p-10 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-300 font-bold uppercase '>
                                Signature
                            </div>
                            <div className='col-span-4 space-y-4'>
                                <div className='flex justify-between items-center text-sm'>
                                    <span className='text-gray-500'>Subtotal:</span>
                                    <span className='font-semibold text-gray-800'>{subTotal.toLocaleString('tr-TR')} ₺</span>
                                </div>
                                <div className='flex justify-between items-center text-sm'>
                                    <span className='text-gray-500'>Tax (%{taxRate}):</span>
                                    <span className='font-semibold text-gray-800'>{taxAmount.toLocaleString('tr-TR')} ₺</span>
                                </div>
                                <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                                    <span className='text-base font-bold text-gray-900'>General Total:</span>
                                    <span className='text-2xl font-black text-blue-600'>{grandTotal.toLocaleString('tr-TR')} ₺</span>
                                </div>
                            </div>
                        </div>

                        <div className='mt-12 flex justify-end'>
                            <button
                                type='submit'
                                className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3 px-10 py-4 rounded-lg transition active:scale-95'
                            >
                                <img src={print} alt='Yazdır' width={24} className="brightness-0 invert" />
                                <span className="font-bold tracking-wide">Save & Print</span>
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default FinanceBillsPage;