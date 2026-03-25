import { useCommentOnEmployees, useDeleteComment, useEmployeeComments, useUserList } from '../../../hooks/MoodHooks/UseMood';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { Field, Form, Formik } from 'formik';
import send from '../../../assets/send.svg';
import { useState } from 'react';


interface FormValueTypes {
    userId: string,
    content: string,
}
const initialValues: FormValueTypes = {
    userId: "",
    content: "",
}


function RateEmployees() {
    const [selectedUser, setSelectedUser] = useState<string | undefined>();
    const commentMutation = useCommentOnEmployees();
    const deleteMutation = useDeleteComment();

    const { data, isLoading, isError } = useUserList();
    const { data: commentData, isLoading: commentIsLoading, isError: commentIsError } = useEmployeeComments(selectedUser);

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorMessage />;

    const handleSubmit = (values: FormValueTypes, { resetForm }: any) => {
        commentMutation.mutate(values, {
            onSuccess: () => resetForm()
        });
    }

    const handleDelete = (commentId: any) => {
        deleteMutation.mutate({ commentId, userId: selectedUser });
    }

    return (
        <div>
            <div className='p-4'>
                <p className="text-xl font-semibold text-slate-700 font-rubik">Comment on Employee</p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ setFieldValue }) => (
                        <Form className='mt-4'>
                            <Field
                                className="text-gray-500 cursor-pointer border border-gray-200 w-full rounded-sm px-2 py-1 focus:outline-none"
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
                            <Field className="text-gray-500 my-4 cursor-pointer border border-gray-200 w-full rounded-sm px-2 py-1 focus:outline-none resize-none" as="textarea" name="content" placeholder="Comment..." />
                            <button type="submit" disabled={commentMutation.isPending} className="bg-indigo-400 hover:bg-indigo-500 text-white w-full py-2 flex items-center justify-center rounded-sm transition-all active:scale-[0.98]">
                                {commentMutation.isPending ? "Sending..." : <img src={send} alt="Send" width={25} />}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {selectedUser && (
                <div className="mt-4 border-t border-gray-100">
                    <div className='text-start flex justify-start'>
                        <p className="text-xl font-semibold text-slate-800 font-rubik ps-4 py-4">Comments of Employee</p>
                    </div>
                    {commentIsLoading ? (
                        <div className="flex justify-center py-10"><Spinner /></div>
                    ) : commentIsError ? (
                        <div className="px-4"><ErrorMessage /></div>
                    ) : (
                        <div className="h-[160px] overflow-y-auto grid grid-cols-12 gap-4 px-4 pb-10">
                            {commentData?.map((item: any) => (
                                <div key={item.id} className="border col-span-6 rounded-md shadow-sm border-gray-200 min-h-[140px] flex flex-col relative group">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className='absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity'
                                    >
                                        ✕
                                    </button>
                                    <div className="flex-1 p-4">
                                        <p className="text-gray-500 text-sm">{item.content}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 border-t border-gray-100">
                                        <p className="text-gray-400 text-[10px] text-right">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RateEmployees
