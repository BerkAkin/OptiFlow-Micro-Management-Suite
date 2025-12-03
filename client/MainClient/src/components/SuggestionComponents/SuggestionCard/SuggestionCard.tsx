import { useState } from 'react'
import up from '../../../assets/up.svg'
import down from '../../../assets/down.svg'
import add from '../../../assets/add.svg'
import list from '../../../assets/list.svg'
import { Field, Form, Formik } from 'formik'
import { useApprove, useComment, useVote } from '../../../hooks/SuggestionHooks/useSuggestion'

interface SuggestionCardProps {
    id: number,
    status: string,
    header: string,
    date: string,
    description: string,
    voteCount: number,
    commentCount: number,
    comments: {
        commentText: string,
        date: string,
    }[]
}

function SuggestionCard({ id, status, header, description, voteCount, commentCount, comments, date }: SuggestionCardProps) {

    const voteMutation = useVote();
    const commentMutation = useComment();
    const approveOrReject = useApprove();

    const handleVote = (vote: number) => {
        voteMutation.mutate({ id, vote })
    }
    const handleComment = (values: any) => {
        commentMutation.mutate({ ...values, id })
    }
    const handleApproveOrReject = (decision: boolean) => {
        approveOrReject.mutate({ id, decision })
    }
    const [commentSection, setCommentSection] = useState<boolean>(false);

    return (
        <div className='border border-gray-200 rounded-lg '>
            <div className='text-center py-4 flex justify-center items-center  w-full'>
                <p className='text-gray-900'>
                    {header}
                    <button type='button' onClick={() => handleApproveOrReject(false)} className='cursor-pointer ms-2 bg-red-500 rounded-full shadow-custom w-6 text-xs text-white'>✘</button>
                    <button type='button' onClick={() => handleApproveOrReject(true)} className='cursor-pointer bg-green-500 rounded-full shadow-custom w-6 text-xs text-white mx-1 '>✔</button>
                </p>
            </div>
            <div className='text-center py-4 flex justify-center items-center'>
                <p className='text-sm text-gray-700 px-6'>{description}</p>
            </div>
            <div className='text-center px-6 py-4 flex justify-center items-center   w-full grid grid-cols-3'>
                <div className=' flex items-center justify-start'>
                    <p className='text-gray-800 grid grid-cols-3 flex items-center'>

                        <button type='button' onClick={() => handleVote(0)} className='cursor-pointer'>
                            <img className='hover:bg-red-300 rounded-full' src={down} width={20} alt="" />
                        </button>
                        {voteCount}

                        <button type='button' onClick={() => handleVote(1)} className=' cursor-pointer text-2xl '>
                            <img className='hover:bg-green-300 rounded-full' src={up} width={20} alt="" />
                        </button>

                    </p>
                </div>
                <div className=' flex justify-center items-center'>
                    <p className={`${status === "Approved" ? 'text-green-600' : 'text-red-500'} `}>{status}</p>
                </div>
                <div className=' flex items-center justify-end'>
                    <button className='cursor-pointer' onClick={() => setCommentSection(!commentSection)}>
                        <img src={list} width={20} alt="" />
                    </button>
                    <p className='text-gray-800 mx-1'> {commentCount}</p>
                </div>
            </div>
            <div className='flex items-center  py-1 justify-center'>
                <p className='text-sm text-gray-400'>{date}</p>
            </div>
            {commentSection &&
                <div className='border-t border-gray-200 h-[200px] w-full overflow-y-auto'>
                    <Formik initialValues={{ text: "" }} onSubmit={handleComment}>
                        <Form>
                            <div className='flex justify-center items-center'>
                                <Field as="textarea" rows={2} className="resize-none border rounded-md focus:outline-none border-gray-200 w-[70%] mx-3 px-2 my-2" name="text" placeholder="Comment..." />
                                <button type='submit'><img src={add} width={25} alt="" /></button>
                            </div>

                        </Form>
                    </Formik>
                    {comments.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-none py-2 px-5 text-sm text-gray-600 text-center">
                            {index + 1}{")"} {item.commentText}
                            <span className="text-sm text-gray-400 ps-1">{item.date}</span>
                        </div>
                    ))}

                </div>
            }
        </div >
    )
}

export default SuggestionCard
