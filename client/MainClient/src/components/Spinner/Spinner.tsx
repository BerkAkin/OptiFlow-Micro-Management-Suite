import styles from './styles.module.css';

function Spinner() {
    return (
        <div className='h-full w-full p-10 flex flex-col justify-center items-center'>
            <div className="relative">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100 size-24"></div>

                <div className={`
                    ${styles.loader} 
                    rounded-full 
                    border-4 
                    border-transparent 
                    border-t-blue-500 
                    border-r-blue-500/30 
                    size-24
                `}></div>
            </div>

            <p className="mt-6 text-sm font-medium text-gray-400 tracking-widest uppercase animate-pulse">
                Loading
            </p>
        </div>
    );
}

export default Spinner;