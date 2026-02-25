import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSupportMessages } from '../../../hooks/SupportHooks/UseSupport';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { Field, Form, Formik } from 'formik';
import send from '../../../assets/send.svg';

function SupportMessages() {

    const { id } = useParams();
    const { data, isLoading, error } = useSupportMessages(Number(id));
    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        if (data) {
            setMessages(data);
        }
    }, [data]);

    const handleSubmit = (values: any) => {
        const newMessage = {
            senderId: 0,
            message: values.message,
            date: new Date().toLocaleDateString()
        };

        setMessages(prev => [...prev, newMessage]);

    }
    const initialValues = {
        message: "",
        senderId: id
    }
    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;
    return (
        <div className='border border-gray-200 bg-white rounded-lg shadow-custom h-[460px] w-full'>
            <div className='h-[10%] text-start flex justify-start border-b border-gray-200 pb-2'>
                <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4 `}>Messages of {id} Request</p>
            </div>

            <div className='overflow-y-auto h-[75%] px-3 py-4 '>
                {messages.map((item, index) =>
                (
                    item.senderId == 0
                        ?
                        <div className='flex justify-end'>
                            <div key={index} className='border bg-lime-500 w-[25%] rounded-md border-gray-200 my-2 p-3'>
                                <p className='text-white'>{item.message}</p>
                                <p className=' text-end text-xs text-gray-200'>{item.date}</p>
                            </div>
                        </div>

                        :
                        <div className='flex justify-start'>
                            <div key={index} className='border bg-lime-600 w-[25%] rounded-md border-gray-200 my-2 p-3'>
                                <p className='text-white'>{item.message}</p>
                                <p className=' text-end text-xs text-gray-200'>{item.date}</p>
                            </div>
                        </div>
                ))}
            </div>
            <div className='h-[15%]'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className='flex px-4'>
                            <Field id="message" name="message" className="border border-gray-200 rounded px-4 mx-2 outline-none w-[95%]" placeholder="Message..." />
                            <button type="submit" className={`bg-lime-600 text-white w-[5%] py-2 flex items-center justify-center rounded-sm transition-all hover:scale-[1.03] hover:bg-lime-500 active:scale-[0.98]`}>
                                <img src={send} alt="Send" width={25} />
                            </button>


                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default SupportMessages
