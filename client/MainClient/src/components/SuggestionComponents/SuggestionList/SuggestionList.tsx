import DynamicTable from '../../DynamicTable/DynamicTable';
import SuggestionCard from '../SuggestionCard/SuggestionCard';


interface filterValues {
    status: string,
    date: string,
    description: string
}


function SuggestionList() {


    const Data = [
        {
            Id: 0,
            Status: "Approved",
            Header: "Sokak Hayvanları",
            Description: "Bence soğuk havada hayvanları ofiste ayrılmış bölümün içerisine almalıyız",
            VoteCount: 1,
            Date: "25-12-2025",
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
            Id: 1,
            Status: "Rejected",
            Header: "Sokak Hayvanları",
            Description: "Ofis camları günde 5 saat kadar açılmalı ve öyle kalmalı",
            VoteCount: 1,
            Date: "25-12-2025",
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


    return (

        <div className='h-[650px] bg-white rounded-lg shadow-custom border border-gray-200'>

            <div className='w-full text-center flex justify-center items-start'>
                <p className={`text-xl text-center px-6 text-white bg-indigo-400 rounded-b-sm font-rubik`}>Suggestions</p>
            </div>
            <div className='h-[90%] overflow-y-auto my-6 grid gap-6 px-6 grid-cols-12'>
                {Data.map((item, index) => (
                    <div className='col-span-3' key={index}>
                        <SuggestionCard {...item} />
                    </div>
                ))}
            </div>

        </div>
    )

}

export default SuggestionList
