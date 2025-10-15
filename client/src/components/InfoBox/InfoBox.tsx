

interface InfoBoxProps {
    items: { text: string }[];
}


function InfoBox({ items }: InfoBoxProps) {



    return (
        <div className='absolute transform left-1/2 -translate-x-1/2 -translate-y-1/2  w-[70%] '>
            <div className='grid bg-white grid-cols-4 shadow-lg border h-[120px] rounded-sm'>
                <div className='flex items-center justify-center'>
                    <h1 className="border-s-2 border-indigo-400 ps-6 text-2xl text-gray-600 ">{items[0].text}</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <h1 className="border-s-2 border-indigo-400 ps-6 text-2xl text-gray-600">{items[1].text}</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <h1 className="border-s-2 border-indigo-400 ps-6 text-2xl text-gray-600">{items[2].text}</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <h1 className="border-s-2 border-indigo-400 ps-6 text-2xl text-gray-600">{items[3].text}</h1>
                </div>
            </div>
        </div>
    )
}

export default InfoBox
