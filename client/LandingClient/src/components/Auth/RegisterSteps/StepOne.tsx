function StepOne({ handleChange, registerInfo, setRegisterInfo, nextStep, setIsModal }: any) {
    return (
        <>
            <div className='size-96 h-[620px] pt-6 bg-white rounded-sm'>

                <div className="text-center">
                    <h1 className='text-4xl text-gray-700'>PURCHASE SUBSCRIPTION</h1>
                    <h1 className='text-lg text-gray-700 mt-6'><span className="">User Info</span></h1>
                </div>

                <div className='text-center mt-6'>
                    <input onChange={handleChange} type="text" name="name" placeholder="First Name" className="w-60  text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1  bg-transparent focus:bg-transparent" />
                </div>

                <div className='text-center mt-6'>
                    <input onChange={handleChange} type="text" name="surname" placeholder="Last Name" className="w-60 text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1 bg-transparent focus:bg-transparent" />
                </div>

                <div className='text-center mt-6'>
                    <input onChange={handleChange} type="text" name="email" placeholder="E-Mail" className="w-60 text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1 bg-transparent focus:bg-transparent" />
                </div>

                <div className='text-center mt-6'>
                    <input onChange={handleChange} type="text" name="phone" placeholder="Phone Number" className="w-60 text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1  bg-transparent focus:bg-transparent" />
                </div>

                <div className='text-center mt-6'>
                    <input onChange={handleChange} type="text" name="password" placeholder="Password" className="w-60 text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1  bg-transparent focus:bg-transparent" />
                </div>

                <div className="flex justify-center mt-8">

                    <button onClick={nextStep} className='bg-black w-36 mx-2 text-white h-12' >Next</button>
                    <button onClick={() => setIsModal(false)} className='bg-red-800 mx-2 w-20 text-white' >Cancel</button>

                </div>


            </div>

        </>
    )
}

export default StepOne
