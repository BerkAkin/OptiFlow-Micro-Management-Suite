import RegisterModal from '../Auth/RegisterModal';


function ModalContainer() {


    return (
        <>
            <div className=' w-[100%] h-full bg-black/40 absolute z-10 flex items-center justify-center backdrop-blur-sm '>
                <RegisterModal />
            </div>
        </>
    )
}

export default ModalContainer
