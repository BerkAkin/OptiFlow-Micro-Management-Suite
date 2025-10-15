export default function PageTopBtn() {

    const scrollTop = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' })

    }


    return (
        <div className='fixed rounded-3xl w-[50px] h-[50px] bg-indigo-400 border border-indigo-500 shadow-xl bottom-10 right-10 z-50'>
            <button className='w-full h-full text-3xl text-white cursor-pointer' onClick={scrollTop} > ↑ </button>
        </div>
    )
}
