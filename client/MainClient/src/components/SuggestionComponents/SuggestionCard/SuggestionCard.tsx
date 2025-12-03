import { useState } from 'react'
import up from '../../../assets/up.svg'
import down from '../../../assets/down.svg'
import add from '../../../assets/add.svg'
import list from '../../../assets/list.svg'
import { Field, Form, Formik } from 'formik'

interface SuggestionCardProps {
    Status: string,
    Header: string,
    Date: string,
    Description: string,
    VoteCount: number,
    CommentCount: number,
    Comments: {
        CommentText: string,
        Date: string,
    }[]

}

function SuggestionCard({ Status, Header, Description, VoteCount, CommentCount, Comments, Date }: SuggestionCardProps) {

    const [commentSection, setCommentSection] = useState<boolean>(false);

    return (
        <div className='border border-gray-200 rounded-lg '>
            <div className='text-center py-4 flex justify-center items-center  w-full'>
                <p className='text-gray-900'>
                    {Header}
                    <button className='cursor-pointer ms-2 bg-red-500 rounded-full shadow-custom w-6 text-xs text-white'>✘</button>
                    <button className='cursor-pointer bg-green-500 rounded-full shadow-custom w-6 text-xs text-white mx-1 '>✔</button>
                </p>
            </div>
            <div className='text-center py-4 flex justify-center items-center '>
                <p className='text-sm text-gray-700 px-6'>{Description}</p>
            </div>
            <div className='text-center px-6 py-4 flex justify-center items-center   w-full grid grid-cols-3'>
                <div className=' flex items-center justify-start'>
                    <p className='text-gray-800 grid grid-cols-3 flex items-center'>

                        <button className='cursor-pointer'>
                            <img className='hover:bg-red-300 rounded-full' src={down} width={20} alt="" />
                        </button>
                        {VoteCount}

                        <button className=' cursor-pointer text-2xl '>
                            <img className='hover:bg-green-300 rounded-full' src={up} width={20} alt="" />
                        </button>

                    </p>
                </div>
                <div className=' flex justify-center items-center'>
                    <p className={`${Status === "Approved" ? 'text-green-600' : 'text-red-500'} `}>{Status}</p>
                </div>
                <div className=' flex items-center justify-end'>
                    <button className='cursor-pointer' onClick={() => setCommentSection(!commentSection)}>
                        <img src={list} width={20} alt="" />
                    </button>
                    <p className='text-gray-800 mx-1'> {CommentCount}</p>
                </div>
            </div>
            <div className='flex items-center  py-1 justify-center'>
                <p className='text-sm text-gray-400'>{Date}</p>
            </div>
            {commentSection &&
                <div className='border-t border-gray-200 h-[200px] w-full overflow-y-auto'>
                    <Formik initialValues={{ comment: "" }} onSubmit={(values: any) => { console.log(values) }}>
                        <Form>
                            <div className='flex justify-center items-center'>
                                <Field as="textarea" rows={2} className="resize-none border rounded-md focus:outline-none border-gray-200 w-[70%] mx-3 px-2 my-2" name="comment" placeholder="Comment..." />
                                <button type='submit'><img src={add} width={25} alt="" /></button>
                            </div>

                        </Form>
                    </Formik>
                    {Comments.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-none py-2 px-5 text-sm text-gray-600 text-center">
                            {index + 1}{")"} {item.CommentText}
                            <span className="text-sm text-gray-400 ps-1">{item.Date}</span>
                        </div>
                    ))}

                </div>
            }
        </div >
    )
}

export default SuggestionCard
