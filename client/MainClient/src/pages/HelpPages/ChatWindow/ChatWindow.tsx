import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router';
import { useState } from 'react';
import send from '../../../assets/send.svg';

interface Message {
    id: number;
    text: string;
    date: string;
    sender: 'me' | 'other';
}

interface FormFields {
    message: string;
}

const ChatWindow = () => {
    const { userId } = useParams();

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Merhaba", date: "2025-11-25T15:00:00", sender: "other" },
        { id: 2, text: "Selam!", date: "2025-11-25T15:01:00", sender: "me" },
    ]);

    const handleSubmit = (values: FormFields) => {
        console.log(values)
    };

    //api isteğinden sıralı gelecek zaten bu geçici
    const sortedMessages = [...messages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className='h-[400px] m-6 flex flex-col'>

            <div className='border-x border-t border-gray-200 rounded-t-lg h-[90%] overflow-y-auto p-2 flex flex-col gap-2'>
                <div className='border-b border-gray-200'>
                    <p className='text-gray-500 text-xl px-1 font-semibold'>{userId} Berk Akın</p>
                </div>
                {sortedMessages.map(msg => (
                    <div key={msg.id} className={`p-2 rounded-md max-w-[70%] ${msg.sender === "me" ? "bg-lime-300 self-end" : "bg-gray-200 self-start"}`} >
                        <div>{msg.text}</div>
                        <div className='text-xs text-gray-500 mt-1'>{new Date(msg.date).toLocaleString()}</div>
                    </div>
                ))}
            </div>

            <Formik initialValues={{ message: "" }} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className='mt-auto'>
                        <div className='border border-gray-200 grid grid-cols-12 rounded-b-lg'>
                            <div className='col-span-11'>
                                <Field placeholder="Message..." className="focus:outline-none px-2 w-full h-full" name="message" type="text" />
                            </div>
                            <div className='col-span-1 p-1'>
                                <button type='submit' className='w-full flex justify-center bg-lime-600 hover:bg-lime-700 p-1'>
                                    <img src={send} alt="Send Message" />
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChatWindow;
