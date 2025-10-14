interface ProgressCounterProps {
    depth: number
    currentStep: number
}

function ProgressCounter({ depth, currentStep }: ProgressCounterProps) {
    const steps = Array.from({ length: depth })
    return (
        <>
            <div className='flex justify-center items-center'>
                {steps.map((_, index) => {

                    const isCompleted = index + 1 <= currentStep;

                    return (
                        <div className='my-5 flex items-center' key={index}>
                            <div className={`${isCompleted ? 'border border-indigo-300 bg-indigo-500' : ""} border rounded-full size-4 text-center text-white items-center flex justify-center`}></div>
                            <div className={`${(index + 1) < currentStep ? 'border-b border-indigo-300 ' : ''} border-b w-20 h-1`}></div>
                        </div>
                    )
                })}
                <div className={`${currentStep == 4 ? "border border-indigo-300 bg-indigo-500" : ""} border rounded-full size-4 text-center text-white items-center flex justify-center`}></div>
            </div >


        </>
    )
}

export default ProgressCounter
