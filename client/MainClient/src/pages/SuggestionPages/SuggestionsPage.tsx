import React from 'react'
import SuggestionCard from '../../components/SuggestionComponents/SuggestionCard/SuggestionCard'
import SuggestionList from '../../components/SuggestionComponents/SuggestionList/SuggestionList'
import SuggestionShowcaseCard from '../../components/SuggestionComponents/SuggestionShowcaseCard/SuggestionShowcaseCard'

//suggest ideas burada çekilecek ve card dönülecek



const Data = [
    {
        Status: "Approved",
        Header: "Sokak Hayvanları",
        Description: "Bence soğuk havada hayvanları ofiste ayrılmış bölümün içerisine almalıyız",
        VoteCount: 1,
        CommentCount: 2,
        Comments: [
            {
                CommentText: "Alerjisi olan insanlar için kötü bir fikir",
                Date: "20.10.2025",
            },
            {
                CommentText: "Ayrı bir bölüm olacaksa olabilir",
                Date: "20.10.2025",
            },
        ]
    },
    {
        Status: " ",
        Header: "Sokak Hayvanları",
        Description: "Ofis camları günde 5 saat kadar açılmalı ve öyle kalmalı",
        VoteCount: 1,
        CommentCount: 2,
        Comments: [
            {
                CommentText: "Havalar soğuk olmaz",
                Date: "20.10.2025",
            },
            {
                CommentText: "Mola saatlerinde olabilir",
                Date: "20.10.2025",
            },
        ]
    },
]


//suggestion verileri burada çekilip componentlere dağıtılsın

function SuggestIdeas() {
    return (
        <div className='container mx-auto my-10 grid grid-cols-10 flex justify-center gap-6'>

            <div className='col-span-2 bg-white h-[800px] rounded-lg shadow-custom border'>
                <div className=' w-full text-center flex justify-center items-start'>
                    <p className={`text-2xl text-center px-5 text-white bg-indigo-400 rounded-b-sm font-rubik`}>Current Suggestions</p>
                </div>
                <div className='h-[95%] overflow-y-auto'>
                    {Data.map((item, index) => (
                        <div key={index}>
                            <SuggestionCard {...item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-span-8'>
                <div className='grid grid-cols-10 gap-6 mb-6'>
                    <div className='col-span-5 '>
                        <SuggestionShowcaseCard isStar={true} Description='Bence soğuk havada hayvanları ofiste ayrılmış bölümün içerisine almalıyız' VoteCount={753} />
                    </div>
                    <div className='col-span-5 '>
                        <SuggestionShowcaseCard isStar={false} Description='Ofis camları günde 5 saat kadar açılmalı ve öyle kalmalı' VoteCount={242} />
                    </div>
                </div>
                <SuggestionList />
            </div>
        </div >
    )
}

export default SuggestIdeas
