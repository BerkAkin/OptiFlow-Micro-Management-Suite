import { useShowcase } from '../../../hooks/SuggestionHooks/useSuggestion'
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Spinner from '../../Spinner/Spinner';
import SuggestionShowcaseCard from '../SuggestionShowcaseCard/SuggestionShowcaseCard'

function SuggestionShowcase() {

    const { data, isLoading, error } = useShowcase();
    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

    return (
        <div className='grid grid-cols-10 gap-6 '>
            <div className='col-span-5 '>
                <SuggestionShowcaseCard isStar={true} Description={data.best.description} VoteCount={data.best.votes} />
            </div>
            <div className='col-span-5 '>
                <SuggestionShowcaseCard isStar={false} Description={data.thisMonth.description} VoteCount={data.thisMonth.votes} />
            </div>
        </div>
    )
}

export default SuggestionShowcase
