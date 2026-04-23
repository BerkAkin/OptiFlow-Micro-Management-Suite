import { Field, Form, Formik } from 'formik';
import React from 'react';
import send from '../../assets/send.svg';
import cancel from '../../assets/cancel.svg';

interface Fields {
    label: string;
    name: string;
    id: string;
    type: "text" | "number" | "checkbox" | "date" | "file" | "password";
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

const inputBaseClass = "text-slate-600 text-sm border border-slate-200 w-full rounded-lg px-4 py-2.5 focus:outline-none transition-all resize-none bg-slate-50/50 hover:bg-white";
const errorClass = "border-red-400 focus:ring-red-500/10 focus:border-red-500 bg-red-50/10";

function DynamicForm({ title, validationScheme, colorScheme, hoverScheme, fields, initialValues, onSubmit, children, onCancel }: FormProps) {
    return (
        <div className='p-6'>
            {title && (
                <p className="text-lg font-bold text-slate-800 font-rubik mb-6 tracking-tight">
                    {title}
                </p>
            )}

            <Formik
                validationSchema={validationScheme}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validateOnMount={false}
            >
                {({ errors, touched, setFieldValue, values }) => (
                    <Form className="space-y-4">
                        {fields && fields.map((item) => {
                            const hasError = errors[item.name] && touched[item.name];

                            return (
                                <div key={item.name} className="flex flex-col group">
                                    <div className="flex justify-between items-center mb-1.5 px-1">
                                        <label htmlFor={item.id} className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                            {item.label}
                                        </label>
                                        {hasError && (
                                            <span className="text-red-500 text-[10px] font-bold animate-pulse">
                                                {errors[item.name] as string}
                                            </span>
                                        )}
                                    </div>

                                    {item.type === "file" ? (
                                        <div className="relative">
                                            <label
                                                htmlFor={item.id}
                                                className={`${inputBaseClass} ${hasError ? errorClass : ''} cursor-pointer flex items-center justify-between overflow-hidden whitespace-nowrap`}
                                            >
                                                <span className={values[item.name] ? "text-slate-800 font-medium" : "text-slate-400"}>
                                                    {values[item.name] ? (values[item.name] as File).name : item.placeholder || "Dosya seçiniz..."}
                                                </span>
                                                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-bold uppercase">Gözat</span>
                                            </label>
                                            <input
                                                className="hidden"
                                                id={item.id}
                                                type="file"
                                                onChange={(e) => setFieldValue(item.name, e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    ) : item.as === "select" ? (
                                        <Field
                                            as="select"
                                            name={item.name}
                                            id={item.id}
                                            className={`${inputBaseClass} ${hasError ? errorClass : ''} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat`}
                                        >
                                            <option value="" disabled>{item.placeholder}</option>
                                            {item.options?.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </Field>
                                    ) : item.type === "checkbox" ? (
                                        <div className='flex items-center space-x-3 py-2 px-1 group cursor-pointer'>
                                            <Field
                                                type="checkbox"
                                                name={item.name}
                                                id={item.id}
                                                className="cursor-pointer accent-indigo-600 w-5 h-5 rounded-lg border-slate-300 transition-all"
                                            />
                                            <label className="text-slate-600 text-sm font-medium cursor-pointer select-none" htmlFor={item.id}>
                                                {item.label}
                                            </label>
                                        </div>
                                    ) : (
                                        <Field
                                            as={item.as}
                                            name={item.name}
                                            id={item.id}
                                            type={item.type}
                                            placeholder={item.placeholder}
                                            className={`${inputBaseClass} ${hasError ? errorClass : ''}`}
                                        />
                                    )}
                                </div>
                            );
                        })}

                        <div className="py-2">
                            {typeof children === 'function' ? children({ setFieldValue, values }) : children}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className={`${colorScheme} ${hoverScheme} flex-1 cursor-pointer text-white h-12 flex items-center justify-center rounded-lg transition-all active:scale-[0.98] font-bold gap-2`}
                            >
                                <img src={send} alt="Send" width={20} className="brightness-0 invert" />
                                <span>Send</span>
                            </button>

                            {onCancel && (
                                <button
                                    type='button'
                                    onClick={onCancel}
                                    className="cursor-pointer bg-red-600 hover:bg-red-700  w-14 h-12 flex items-center justify-center rounded-lg transition-all active:scale-[0.98]"
                                >
                                    <img src={cancel} alt="Cancel" width={20} className="invert brightness-0" />
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