import styles from './styles.module.css';

function Spinner() {
    return (
        <div className='h-full w-full p-6 flex justify-center items-center flex-col'>
            <div className={`${styles.loader} rounded-full border-3 border-gray-200 border-t-gray-400 size-32`}></div>
            <p className={`my-4 text-gray-400`}>Loading</p>
        </div>
    )
}

export default Spinner
