import { Spinner, ErrorMessage } from '../../Common';
import { Field, Form, Formik } from 'formik';
import { send } from '../../../assets/icons';
import { useState } from 'react';
import { useAddComment, useDeleteComment, useEmployeeComments, useMoodUserList } from '../../../hooks';

interface FormValueTypes {
    userId: string,
    content: string,
}

const initialValues: FormValueTypes = {
    userId: "",
    content: "",
}

export function AddComment() {
    const [selectedUser, setSelectedUser] = useState<string | undefined>();
    const commentMutation = useAddComment();
    const deleteMutation = useDeleteComment();

    const { data, isLoading, isError } = useMoodUserList();
    const { data: commentData, isLoading: commentIsLoading, isError: commentIsError } = useEmployeeComments(selectedUser);

    if (isLoading) return <div className="p-10"><Spinner /></div>;
    if (isError) return <div className="p-10"><ErrorMessage /></div>;

    const handleSubmit = (values: FormValueTypes, { resetForm }: any) => {
        commentMutation.mutate(values, {
            onSuccess: () => resetForm()
        });
    }

    const handleDelete = (commentId: any) => {
        deleteMutation.mutate({ commentId, userId: selectedUser });
    }

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none transition";

    return (
        <div className="flex gap-6 mx-auto grid grid-cols-12">
            <div className='col-span-2 bg-white rounded-xl shadow-custom border border-gray-200 p-6'>
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800 font-rubik tracking-tight">Employee Rating</h2>
                </div>

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ setFieldValue }) => (
                        <Form className='space-y-4'>
                            <div className="relative">
                                <Field
                                    className={inputStyle}
                                    as="select"
                                    name="userId"
                                    onChange={(e: any) => {
                                        const value = e.target.value;
                                        setFieldValue("userId", value);
                                        setSelectedUser(value);
                                    }}
                                >
                                    <option value="">Select Employee...</option>
                                    {data?.map((item: any) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </Field>
                            </div>

                            <Field
                                className={`${inputStyle} min-h-[100px] resize-none`}
                                as="textarea"
                                name="content"
                                placeholder="Write your feedback here..."
                            />

                            <button
                                type="submit"
                                disabled={commentMutation.isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
                            >
                                {commentMutation.isPending ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </span>
                                ) : (
                                    <>
                                        <span>Send</span>
                                        <img src={send} alt="Send" width={18} className="brightness-0 invert" />
                                    </>
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='col-span-10'>
                {selectedUser ? (
                    <div className="bg-white rounded-xl shadow-custom border border-gray-200 flex flex-col overflow-hidden transition">
                        <div className='px-6 py-5 border-b border-gray-50 flex justify-between items-center'>
                            <h3 className="text-lg font-bold text-slate-800 font-rubik tracking-tight">Employee Comments</h3>
                        </div>

                        {commentIsLoading ? (
                            <div className="flex justify-center py-20"><Spinner /></div>
                        ) : commentIsError ? (
                            <div className="p-10"><ErrorMessage /></div>
                        ) : (
                            <div className="max-h-[260px] h-[260px] overflow-y-auto p-6 custom-scrollbar">
                                <div className="grid grid-cols-12 gap-4">
                                    {commentData?.length > 0 ? (
                                        commentData.map((item: any) => (
                                            <div key={item.id} className="col-span-2 relative bg-white border border-gray-200 rounded-lg p-5 transition flex flex-col min-h-[140px] shadow-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item.id)}
                                                    className='absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-red-200 text-red-500 rounded-full cursor-pointer'
                                                    title="Delete Comment"
                                                >
                                                    ✕
                                                </button>

                                                <div className="flex-1">
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>

                                                <div className="mt-4 pt-3 flex justify-end">
                                                    <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded">
                                                        {item.date}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-10 text-center text-gray-400 italic text-sm">
                                            No comment for this employee...
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full min-h-[300px] bg-white rounded-xl shadow-custom border  border-gray-200 flex flex-col items-center justify-center text-gray-400 p-10 text-center">
                        <p className="text-lg font-medium text-gray-500">No Employee Selected</p>
                        <p className="text-sm">Please select an employee from the list to see their comments.</p>
                    </div>
                )}
            </div>

        </div>
    );
}

