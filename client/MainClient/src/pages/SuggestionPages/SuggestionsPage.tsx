import SuggestionList from '../../components/SuggestionComponents/SuggestionList/SuggestionList'
import SuggestionShowcaseCard from '../../components/SuggestionComponents/SuggestionShowcaseCard/SuggestionShowcaseCard'



function SuggestIdeas() {
    return (
        <div className='container mx-auto my-10 grid grid-cols-10 flex justify-center gap-6'>


            <div className='col-span-10'>
                <div className='grid grid-cols-10 gap-6 '>
                    <div className='col-span-5 '>
                        <SuggestionShowcaseCard isStar={true} Description='Bence soğuk havada hayvanları ofiste ayrılmış bölümün içerisine almalıyız' VoteCount={753} />
                    </div>
                    <div className='col-span-5 '>
                        <SuggestionShowcaseCard isStar={false} Description='Ofis camları günde 5 saat kadar açılmalı ve öyle kalmalı' VoteCount={242} />
                    </div>
                </div>

            </div>
            <div className='col-span-10'>
                <SuggestionList />
            </div>
        </div >
    )
}

export default SuggestIdeas
