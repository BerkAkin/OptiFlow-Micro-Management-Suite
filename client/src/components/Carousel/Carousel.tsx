import { useState } from 'react'
import { motion, AnimatePresence, scale, easeIn, animate } from "framer-motion";

interface CarouselProps {
    items: { id: number, image: string, title: string, text: string }[]

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
                    <motion.div
                        whileHover={{ y: index === 0 ? 20 : 0, transition: { duration: 0.1 } }}
                        animate={{ y: index === 5 ? [-20, -10, 0] : 0, transition: { duration: 0.5 } }}
                        key={item.id} onClick={rotateCarousel}
                        className={`grid grid-cols-2 absolute shadow-md cursor-pointer rounded-sm w-[700px] h-[400px] border`}
                        style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", zIndex: carouselItems.length - index, marginLeft: index * 35, marginBottom: index * 25 }}
                    >


                        <div>
                        </div>
                        <div>
                            <div className='bg-white h-[280px] rounded-b-xs border'>
                                <h2 className=" font-bold text-center p-5 text-xl" style={{ fontFamily: "roobert" }}>{item.title}</h2>
                                <p className="text-sm p-5 text-center" >{item.text}</p>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div >


        </>
    )
}

export default Carousel
