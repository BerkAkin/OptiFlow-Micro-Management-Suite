import { useState } from 'react'

interface CarouselProps {
    items: { id: number, title: string, text: string }[]

}

function Carousel({ items }: CarouselProps) {
    const [carouselItems, setCarouselItems] = useState(items);
    const [active, setActive] = useState(items[0]);


    const rotateCarousel = () => {
        setCarouselItems(prev => {
            const [first, ...rest] = prev
            const newItems = [...rest, first];
            setActive(newItems[0]);
            return [...rest, first];
        })

    }

    return (
        <>

            <div className='relative flex items-center justify-center text-gray-700'>
                {carouselItems.map((item, index) => (
                    <div key={item.id} onClick={rotateCarousel} className={`absolute shadow-md bg-white cursor-pointer rounded-sm w-[700px] h-[400px] border`} style={{ zIndex: carouselItems.length - index, marginLeft: index * 35, marginBottom: index * 25 }}>
                        <div className='grid grid-cols-2 w-[100%] h-[100%]'>
                            <h2 className="text-2xl font-bold">{item.title}</h2>
                            <p className="mt-2" >{item.text}</p>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Carousel
