import { Field, Form, Formik } from 'formik';
import React from 'react'
import send from '../../assets/send.svg';
import cancel from '../../assets/cancel.svg';

interface Fields {
    label: string,
    name: string,
    id: string,
    type: "text" | "number" | "checkbox" | "date" | "file",
    as?: "textarea" | "select",
    placeholder: string,
    options?: { value: string, label: string }[]
}
interface FormProps {
    title: string,
    colorScheme: string,
    hoverScheme: string,
    fields: Fields[] | null;
    initialValues: any;
    onSubmit: (values: any) => void;
    onCancel?: () => void;
    children?: React.ReactNode | ((props: any) => React.ReactNode);

}

function DynamicForm({ title, colorScheme, hoverScheme, fields, initialValues, onSubmit, children, onCancel }: FormProps) {
    return (
        <div>
            <div className={`${colorScheme} w-full py-1 rounded-t-lg text-center`}>
                <p className="text-xl text-white font-rubik">{title}</p>
            </div>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="p-4 space-y-1">
                        {fields && fields.map((item, index) => (
                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700" htmlFor={item.id}>{item.label}</label>
                                {
                                    item.type === "file" ? (
                                        <input hidden id={item.id} name={item.name} type="file" onChange={(e) => { const file = e.target.files?.[0] || null; setFieldValue(item.name, file); }} />
                                    ) : item.as === "select" ? (
                                        <Field as="select" name={item.name} id={item.id} className="cursor-pointer border border-gray-200 resize-none w-full rounded-sm px-2 py-1 focus:outline-none" >
                                            <option value="">Select</option>
                                            {item.options?.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </Field>
                                    ) : (
                                        <Field as={item.as} name={item.name} id={item.id} type={item.type} placeholder={item.placeholder} className="cursor-pointer border border-gray-200 resize-none w-full rounded-sm px-2 py-1 focus:outline-none" />
                                    )
                                }
                            </div>
                        ))}
                        {typeof children === 'function' ? children({ setFieldValue, values }) : children}
                        <div className="flex justify-center pt-2">
                            <button type="submit" className={`${colorScheme} ${hoverScheme} cursor-pointer text-white w-[50px] py-2 flex items-center  justify-center rounded-sm transition`} >
                                <img src={send} alt="" width={25} />
                            </button>
                            {onCancel &&
                                <button type='button' onClick={onCancel} className={`bg-red-400 hover:bg-red-500 cursor-pointer text-white w-[50px] py-2 mx-2 flex items-center  justify-center rounded-sm transition`} >
                                    <img src={cancel} alt="" width={25} />
                                </button>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default DynamicForm
