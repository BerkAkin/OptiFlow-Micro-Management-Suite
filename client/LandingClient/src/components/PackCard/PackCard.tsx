
interface PackCardProps {
    Header: string,
    SingleItems: { isAvailable: boolean, text: string }[]
    Text: string,
    Height: number,
    Width: number,
    IsHover: boolean,
    HeaderBg: string,
    Price: number,
    ButtonText: string
}

function PackCard({ Header, HeaderBg, ButtonText, Price, SingleItems, Text, Height, Width, IsHover }: PackCardProps) {
    return (
        <>

            <div className={`border bg-white mx-4 w-${Width} h-[${Height}px] ${IsHover ? "hover:scale-105" : ""} rounded-lg shadow-lg hover:ease-in transition duration-150`}>
                <div className={`bg-${HeaderBg} grid grid-cols-[75%_25%] rounded-t-lg`} style={{ height: (Height * 15 / 100) }}>
                    <div className='flex items-center justify-center'><p className='text-white text-3xl font-rubik'>{Header}</p></div>
                    <div className='flex items-center justify-center border-s'><p className='text-white text-3xl'>${Price}</p></div>
                </div>
                <div className='text-gray-800  pt-3 px-2 text-center justify-center flex items-center' style={{ height: (Height * 25 / 100) }}>
                    <p>
                        {Text}
                    </p>
                </div>

                <div className='border-t border-b ps-5' style={{ height: (Height * 45 / 100) }}>
                    {SingleItems.map((item, index) => {
                        return (
                            <div className='py-2 text-md text-center text-gray-700' key={index}>
                                <span>{item.isAvailable ? "✔" : "✖"} </span>{item.text}
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center justify-center' style={{ height: (Height * 15 / 100) }}>
                    <button className={`block bg-${HeaderBg} w-48 h-10 text-xl text-white py-2 px-3 md:p-0 rounded-sm hover:bg-indigo-600`}>{ButtonText}</button>
                </div>
            </div>

        </>
    )
}

export default PackCard
