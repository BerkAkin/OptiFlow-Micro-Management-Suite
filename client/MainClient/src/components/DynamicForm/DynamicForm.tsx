import { Field, Form, Formik } from 'formik';
import React from 'react'

interface Fields {
    label: string,
    name: string,
    id: string,
    type: "text" | "number" | "checkbox" | "date" | "file",
    as?: "textarea" | "select",
    placeholder: string
}

interface FormProps {
    title: string,
    colorScheme: string,
    hoverScheme: string,
    btnText: string,
    fields: Fields[];
    initialValues: any;
    onSubmit: (values: any) => void;
    children?: React.ReactNode;
}

function DynamicForm({ title, btnText, colorScheme, hoverScheme, fields, initialValues, onSubmit, children }: FormProps) {
    return (
        <div>
            <div className={`${colorScheme} w-full py-1 rounded-t-lg text-center`}>
                <p className="text-xl text-white font-roobert">{title}</p>
            </div>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="p-4 space-y-1">
                        {fields.map((item, index) => (
                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700" htmlFor={item.id}>{item.label}</label>
                                {
                                    item.type !== "file" ? (
                                        <Field as={item.as} name={item.name} placeholder={item.placeholder} id={item.id} type={item.type} className="border resize-none w-full rounded-sm px-2 py-1 focus:outline-none" />
                                    ) : (
                                        <input hidden id={item.id} name={item.name} type={item.type} onChange={(e) => { const file = e.target.files?.[0] || null; setFieldValue(item.name, file); }} />
                                    )
                                }
                            </div>
                        ))}
                        {children}
                        <div className="flex justify-center pt-2">
                            <button type="submit" className={`${colorScheme} ${hoverScheme} text-white px-6 py-2 rounded-sm  transition`} >
                                {btnText}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default DynamicForm
