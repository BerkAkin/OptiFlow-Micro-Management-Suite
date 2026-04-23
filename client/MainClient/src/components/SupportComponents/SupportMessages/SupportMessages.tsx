import React, { useEffect, useState, useRef } from 'react'
import { useOutletContext, useParams } from 'react-router'
import { useSendSupportRequestMessage, useSupportMessages } from '../../../hooks/SupportHooks/UseSupport';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { Field, Form, Formik } from 'formik';
import send from '../../../assets/send.svg';
import { SendMessageValidationScheme } from '../SupportMessages/SupportMessageValidations';

function SupportMessages() {
    const { id } = useParams();
    const { isClosed } = useOutletContext<{ isClosed: boolean }>();
    const { data, isLoading, error } = useSupportMessages(Number(id));
    const mutation = useSendSupportRequestMessage();
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (data) setMessages(data);
    }, [data]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (values: any, { resetForm }: any) => {
        if (values.message.trim() === "") return;

        const newMessage = {
            message: values.message,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: true,
        };

        const newSentMessage = {
            message: values.message,
            requestId: id,
        };

        setMessages(prev => [...prev, newMessage]);
        mutation.mutate(newSentMessage);
        resetForm();
    }

    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    return (
        <div className='flex flex-col h-full bg-white'>
            <div className='h-[70px] flex items-center justify-between border-b border-slate-100 px-6 shrink-0'>
                <div>
                    <h2 className='text-lg font-bold text-slate-800 font-rubik tracking-tight'>Messages</h2>
                </div>
                {isClosed && (
                    <span className='bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold border border-slate-200'>
                        Archived
                    </span>
                )}
            </div>

            <div
                ref={scrollRef}
                className='flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50'
            >
                {messages.map((item, index) => (
                    <div key={index} className={`flex ${item.isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-4 py-3 rounded-xl relative ${item.isMine
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                            }`}>
                            <p className='text-sm leading-relaxed break-words'>{item.message}</p>
                            <p className={`text-[10px] mt-1.5 text-end font-medium ${item.isMine ? 'text-blue-100' : 'text-slate-400'}`}>
                                {item.createdAt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-4 border-t border-gray-100 bg-white'>
                {!isClosed ? (
                    <Formik
                        initialValues={{ message: "" }}
                        onSubmit={handleSubmit}
                        validationSchema={SendMessageValidationScheme}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className='flex flex-col gap-1'>
                                    <div className={`flex items-center border rounded-lg px-2 py-2 ${errors.message && touched.message ? 'border-red-300' : 'border-gray-200'}`}>
                                        <Field
                                            id="message"
                                            name="message"
                                            autoComplete="off"
                                            className="bg-transparent flex-grow px-3 py-1 text-sm outline-none text-slate-700 placeholder:text-slate-400"
                                            placeholder="Write your response..."
                                        />
                                        <button
                                            type="submit"
                                            className='bg-blue-600 text-white p-2.5 rounded-lg transition cursor-pointer hover:bg-blue-700 active:scale-95'
                                        >
                                            <img src={send} alt="Send" className='w-5 h-5 brightness-0 invert' />
                                        </button>
                                    </div>
                                    {errors.message && touched.message && (
                                        <span className="text-[10px] text-red-500 font-bold ml-4 italic">
                                            {errors.message as string}
                                        </span>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className='py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center'>
                        <p className='text-sm text-slate-400 font-medium italic'>
                            This ticket is closed. You can no longer send messages.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SupportMessages;