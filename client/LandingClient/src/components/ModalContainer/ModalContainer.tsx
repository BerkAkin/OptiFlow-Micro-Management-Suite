import RegisterModal from '../Auth/RegisterModal';


function ModalContainer() {


    return (
        <>
            <div className='inset-0 w-[100%] bg-black/40 absolute z-100 fixed flex items-center justify-center backdrop-blur-sm '>
                <RegisterModal />
            </div>
        </>
    )
}

export default ModalContainer
