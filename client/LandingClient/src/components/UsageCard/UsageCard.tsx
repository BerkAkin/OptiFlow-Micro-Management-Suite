
interface UsageCardProps {
    item: {
        text: string,
        header: string,
        img: string
    }
}

function UsageCard({ item }: UsageCardProps) {


    return (
        <div className='border w-[300px] h-[450px] shadow-md rounded-sm my-2 bg-white hover:ease-in transition duration-150 hover:scale-105 cursor-pointer'>
            <div className='h-[300px]'>
                <img className="w-full h-full object-cover rounded-t-sm" src={item.img}></img>
            </div>
            <div className='h-[100px]'>
                <div className='flex justify-center h-[75px]'>
                    <p className='px-3 text-center py-3 text-md  text-gray-700' >
                        {item.text}
                    </p>
                </div>

                <div className='pt-4 text-center justify-center flex items-end'>
                    <h1 className='font-roobert font-bold ps-3 pt-2 text-xl text-indigo-400'>
                        {item.header}
                    </h1>
                </div>

            </div>
        </div>
    )
}

export default UsageCard
