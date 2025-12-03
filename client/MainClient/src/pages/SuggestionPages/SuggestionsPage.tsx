import SuggestionList from '../../components/SuggestionComponents/SuggestionList/SuggestionList'
import SuggestionShowcase from '../../components/SuggestionComponents/SuggestionShowcase/SuggestionShowcase'



function SuggestIdeas() {
    return (
        <div className='container mx-auto my-10 grid grid-cols-10 flex justify-center gap-6'>
            <div className='col-span-10'>
                <SuggestionShowcase />
            </div>
            <div className='col-span-10'>
                <SuggestionList />
            </div>
        </div >
    )
}

export default SuggestIdeas
