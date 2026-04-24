import { useState } from 'react'
import { up, down, add, list } from '../../../assets/icons'
import { Field, Form, Formik } from 'formik'
import { RoleBasedGuard } from '../../Common'
import { useApproveOrRejectDayoff, useComment, useVote } from '../../../hooks'

interface SuggestionCardProps {
    id: number,
    status: number,
    title: string,
    date: string,
    description: string,
    votes: number,
    comments: {
        id: number,
        text: string,
    }[]
}

export function ListCard({ id, status, title, description, votes, comments, date }: SuggestionCardProps) {

    const voteMutation = useVote();
    const commentMutation = useComment();
    const approveOrReject = useApproveOrRejectDayoff();

    const handleVote = (vote: number) => {
        voteMutation.mutate({ suggestionId: id, voteType: vote })
    }
    const handleComment = (values: any) => {
        commentMutation.mutate({ ...values, suggestionId: id })
    }
    const handleApproveOrReject = (decision: boolean) => {
        approveOrReject.mutate({ id, decision })
    }
    const [commentSection, setCommentSection] = useState<boolean>(false);

    return (
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm transition overflow-hidden'>

            <div className='p-5'>
                <div className='flex justify-between items-start mb-3'>
                    <h3 className='text-lg font-semibold text-slate-800 leading-tight'>
                        {title}
                    </h3>
                    <RoleBasedGuard allowedDepartments={["HR", 'Manager']}>
                        <div className='flex gap-2 ml-4'>
                            <button
                                type='button'
                                onClick={() => handleApproveOrReject(true)}
                                className='flex items-center justify-center w-6 h-6 bg-green-50 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-colors cursor-pointer border border-green-100'
                            >
                                ✔
                            </button>
                            <button
                                type='button'
                                onClick={() => handleApproveOrReject(false)}
                                className='flex items-center justify-center w-6 h-6 bg-red-50 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer border border-red-100'
                            >
                                ✘
                            </button>
                        </div>
                    </RoleBasedGuard>
                </div>

                <p className='text-gray-600 text-sm leading-relaxed mb-6'>
                    {description}
                </p>

                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>

                    <div className='flex items-center space-x-3 px-3 py-1.5 rounded-full'>
                        <button type='button' onClick={() => handleVote(1)} className='hover:scale-110 transition-transform cursor-pointer'>
                            <img src={up} width={18} alt="up" className="opacity-70 hover:opacity-100" />
                        </button>
                        <span className={`font-bold text-sm ${votes >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {votes}
                        </span>
                        <button type='button' onClick={() => handleVote(-1)} className='hover:scale-110 transition-transform cursor-pointer'>
                            <img src={down} width={18} alt="down" className="opacity-70 hover:opacity-100" />
                        </button>
                    </div>

                    <div>
                        {status === 1 ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>
                        ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Rejected</span>
                        )}
                    </div>

                    <div className='flex items-center space-x-4'>
                        <span className='text-[12px] text-gray-400 font-medium'>
                            {date.split("T")[0]}
                        </span>
                        <button
                            className={`p-2 rounded-lg transition-colors cursor-pointer text-gray-400`}
                            onClick={() => setCommentSection(!commentSection)}
                        >
                            <img src={list} width={20} alt="comments" className={commentSection ? 'brightness-75' : 'opacity-60'} />
                        </button>
                    </div>
                </div>
            </div>

            {commentSection && (
                <div className='bg-gray-50 border-t border-gray-100'>
                    <Formik initialValues={{ text: "" }} onSubmit={handleComment}>
                        <Form className='p-4'>
                            <div className='flex items-center gap-2'>
                                <Field
                                    as="textarea"
                                    rows={1}
                                    className="flex-1 bg-white resize-none border border-gray-200 rounded-lg outline-none p-2.5 text-sm transition-all"
                                    name="text"
                                    placeholder="Comment..."
                                />
                                <button className='p-2 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all cursor-pointer' type='submit'>
                                    <img src={add} width={20} alt="add" className="invert brightness-0" />
                                </button>
                            </div>
                        </Form>
                    </Formik>

                    <div className='max-h-[250px] overflow-y-auto px-4 pb-4 space-y-2'>
                        {comments.length > 0 ? (
                            comments.map((item, index) => (
                                <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700">
                                    <div className="flex gap-2">
                                        <span className="text-blue-500 font-bold">{index + 1}.</span>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-xs text-gray-400 py-2">No Comments...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

