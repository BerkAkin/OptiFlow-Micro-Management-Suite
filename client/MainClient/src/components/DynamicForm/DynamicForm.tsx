import { Field, Form, Formik } from 'formik';
import React from 'react';
import send from '../../assets/send.svg';
import cancel from '../../assets/cancel.svg';

interface Fields {
    label: string;
    name: string;
    id: string;
    type: "text" | "number" | "checkbox" | "date" | "file";
    as?: "textarea" | "select";
    placeholder?: string;
    options?: { value: string | number, label: string }[];
}

interface FormProps {
    title: string;
    colorScheme: string;
    hoverScheme: string;
    fields: Fields[] | null;
    initialValues: any;
    onSubmit: (values: any) => void;
    onCancel?: () => void;
    children?: React.ReactNode | ((props: any) => React.ReactNode);
    validationScheme?: any;
}

const inputBaseClass = "text-gray-500 cursor-pointer border border-gray-200 w-full rounded-sm px-2 py-1 focus:outline-none resize-none";

function DynamicForm({ title, validationScheme, colorScheme, hoverScheme, fields, initialValues, onSubmit, children, onCancel }: FormProps) {
    return (
        <div className='p-4'>
            <p className="text-xl px-4 pt-2 font-semibold text-slate-700 font-rubik">{title}</p>

            <Formik
                validationSchema={validationScheme}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validateOnMount={false}
            >
                {({ errors, touched, setFieldValue, values }) => (
                    <Form className="p-4">
                        {fields && fields.map((item) => (
                            <div key={item.name} className="flex flex-col mb-2">
                                <div className="flex justify-between items-end h-2 px-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase"></label>
                                    {errors[item.name] && touched[item.name] && (
                                        <span className="text-red-500 text-[10px] font-bold">
                                            {errors[item.name] as string}
                                        </span>
                                    )}
                                </div>

                                {item.type === "file" ? (
                                    <>
                                        <label htmlFor={item.id} className={`${inputBaseClass} h-[35px] inline-block overflow-hidden`}>
                                            {values[item.name] ? (values[item.name] as File).name : "Dosya seç"}
                                        </label>
                                        <input
                                            className="hidden"
                                            id={item.id}
                                            type="file"
                                            onChange={(e) => setFieldValue(item.name, e.target.files?.[0] || null)}
                                        />
                                    </>
                                ) : item.as === "select" ? (
                                    <Field as="select" name={item.name} id={item.id} className={inputBaseClass}>
                                        <option value="">{item.placeholder}</option>
                                        {item.options?.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </Field>
                                ) : item.type === "checkbox" ? (
                                    <div className='flex items-center space-x-2 py-1'>
                                        <Field type="checkbox" name={item.name} id={item.id} className="cursor-pointer accent-sky-500 w-4 h-4" />
                                        <label className="text-gray-500 text-sm" htmlFor={item.id}>{item.label}</label>
                                    </div>
                                ) : (
                                    <Field as={item.as} name={item.name} id={item.id} type={item.type} placeholder={item.placeholder} className={inputBaseClass} />
                                )}
                            </div>
                        ))}

                        {typeof children === 'function' ? children({ setFieldValue, values }) : children}

                        <div className="flex justify-center pt-4">
                            <button type="submit" className={`${colorScheme} ${hoverScheme} text-white w-full py-2 flex items-center justify-center rounded-sm transition-all active:scale-[0.98]`}>
                                <img src={send} alt="Send" width={25} />
                            </button>
                            {onCancel && (
                                <button type='button' onClick={onCancel} className="bg-red-400 hover:bg-red-500 text-white w-[60px] py-2 mx-2 flex items-center justify-center rounded-sm transition-all active:scale-[0.98]">
                                    <img src={cancel} alt="Cancel" width={25} />
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default DynamicForm;