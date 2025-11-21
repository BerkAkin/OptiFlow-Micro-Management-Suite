
interface HorizontalCardProps {
    item: { text: string, image: string, header: string }
}

function HorizontalCard({ item }: HorizontalCardProps) {
    return (
        <div className='grid grid-cols-[40%_60%] w-[100%] container mx-auto my-5 hover:scale-105 cursor-pointer hover:ease-in transition duration-150 '>
            <div className="h-44 flex justify-end ">
                <img className="w-full h-full object-cover rounded-lg" src={item.image}></img>
            </div>
            <div className="h-44 text-gray-700" >
                <p className="p-5 w-[100%] text-2xl font-bold  font-rubik">
                    <span className="border-indigo-400 border-b-2 font-rubik">{item.header}</span>
                </p>
                <p className="p-5 w-[100%]  text-gray-600">
                    {item.text}
                </p>
            </div>
        </div>
    )
}

export default HorizontalCard
