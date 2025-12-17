import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import send from '../../assets/send.svg';
import UserComments from '../../components/SupportComponents/UserComments/UserComments';
import * as signalR from '@microsoft/signalr';

interface Message {
    id: number;
    text: string;
    date: string;
    sender: 'me' | 'other';
}

interface FormFields {
    message: string;
}

const SupportChatWindow = () => {

    const { userId } = useParams();
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);


    //me kısmı giriş yapan kullanıcın idsi(loggedInUserId) ile değişecek
    const handleSubmit = async (values: FormFields, { resetForm }: any) => {
        if (connection && values.message.trim() !== '') {
            await connection.send('SendPrivateMessage', 'me', userId, values.message)
            resetForm();
            setMessages(prev => [...prev, { id: prev.length + 1, text: values.message, date: new Date().toISOString(), sender: 'me' }]);
        }
        console.log(values)
    };


    useEffect(() => {

        const newConnection = new signalR.HubConnectionBuilder().withUrl(`https://localhost:50001/chathub?userId=${userId}`).withAutomaticReconnect().build();

        setConnection(newConnection);
        newConnection.start().then(() => { console.log("Bağlantı Başarılı") }).catch(err => { console.log("Bağlanılamadı", err) })

        newConnection.on('ReceivedPrivateMessage', (senderId: string, message: string) => {
            setMessages(prev => [...prev, { id: prev.length + 1, text: message, date: new Date().toISOString().split("T")[0], sender: senderId === userId ? 'other' : 'me' }])
        })

        return () => {
            newConnection.stop();
        };

    }, [userId])


    const sortedMessages = [...messages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (

        <div className='h-full p-2 grid grid-cols-12 gap-6 bg-white rounded-lg border border-gray-200 shadow-custom'>

            <div className='col-span-8'>
                <div className='border-x border-t border-gray-200 rounded-t-md h-[90%] overflow-y-auto  flex flex-col gap-2'>
                    <div className='h-[10%] text-start flex justify-start'>
                        <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4`}>Chat</p>
                    </div>
                    <div className='border-b border-gray-200 p-2'>
                        <p className='text-gray-500 text-md px-2 font-semibold'>Berk Akın</p>
                    </div>
                    {sortedMessages.map(msg => (
                        <div key={msg.id} className={`p-2 rounded-md max-w-[70%] ${msg.sender === "me" ? "bg-lime-500 self-end" : "bg-gray-200 self-start"}`} >
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
                                    <button type='submit' className='w-full flex justify-center bg-lime-600 hover:bg-lime-700 p-1 rounded-sm transition'>
                                        <img src={send} width={20} alt="Send Message" />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='col-span-4'>
                <UserComments UserId={Number(userId)} />
            </div>

        </div>

    );
};

export default SupportChatWindow;
