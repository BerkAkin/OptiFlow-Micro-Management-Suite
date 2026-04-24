import { useBests } from '../../../hooks';
import { ErrorMessage, Spinner } from '../../Common';
import { BestsCard } from '../BestsCard/BestsCard';

export function Bests() {
    const { data, isLoading, error } = useBests();

    if (isLoading) return <Spinner />
    if (error || !data) return <ErrorMessage />

    return (
        <div className='grid grid-cols-2 gap-6 w-full'>

            <div className='w-full'>
                <BestsCard
                    isStar={true}
                    Description={data?.best?.description || "Best of this month has not been elected"}
                    VoteCount={data?.best?.votes || 0}
                />
            </div>

            <div className='w-full'>
                <BestsCard
                    isStar={false}
                    Description={data?.thisMonth?.description || "No suggestions yet"}
                    VoteCount={data?.thisMonth?.votes || 0}
                />
            </div>

        </div>
    )
}

