import { useShowcase } from '../../../hooks/SuggestionHooks/useSuggestion'
import SuggestionShowcaseCard from '../SuggestionShowcaseCard/SuggestionShowcaseCard'

function SuggestionShowcase() {

    const { data, isLoading, error } = useShowcase();
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)
    console.log(data);

    return (
        <div className='grid grid-cols-10 gap-6 '>
            <div className='col-span-5 '>
                <SuggestionShowcaseCard isStar={true} Description={data.allTimes} VoteCount={data.allTimesVotes} />
            </div>
            <div className='col-span-5 '>
                <SuggestionShowcaseCard isStar={false} Description={data.monthly} VoteCount={data.monthlyVotes} />
            </div>
        </div>
    )
}

export default SuggestionShowcase
