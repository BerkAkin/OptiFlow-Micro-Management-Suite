
function StepTwo({ handleChange, nextStep, previousStep, setIsModal }: any) {
    return (
        <div className='w-96 h-[720px] pt-6 bg-white rounded-sm'>

            <div className="text-center">
                <h1 className='text-4xl text-gray-700'>PURCHASE SUBSCRIPTION</h1>
                <h1 className='text-lg text-gray-700 mt-6'><span className="border-b">Address Info</span></h1>
            </div>


            <div className='text-center my-8'>
                <input onChange={handleChange} type="text" name="street" placeholder="Street" className="w-56 text-gray-700 border-b focus:outline-none bg-transparent focus:bg-transparent" />
            </div>


            <div className='text-center my-8'>
                <input onChange={handleChange} type="text" name="street2" placeholder="Street 2nd Line" className="w-56 text-gray-700 border-b focus:outline-none bg-transparent focus:bg-transparent" />

            </div>

            <div className='text-center my-8'>
                <input onChange={handleChange} type="text" name="apartmentNum" placeholder="Apartment Number" className="w-56 text-gray-700 border-b focus:outline-non bg-transparent focus:bg-transparent" />

            </div>

            <div className='text-center my-8'>
                <input onChange={handleChange} type="text" name="doorNumber" placeholder="Door Number" className="w-56 text-gray-700 border-b focus:outline-none bg-transparent focus:bg-transparent" />
            </div>


            <div className='text-center my-8'>
                <input onChange={handleChange} type="text" name="province" placeholder="Province" className="w-56 text-gray-700 border-b focus:outline-none bg-transparent focus:bg-transparent" />
            </div>


            <div className='text-center my-8'>
                <input onChange={handleChange} type="text" name="district" placeholder="District" className="w-56 text-gray-700 border-b focus:outline-none bg-transparent focus:bg-transparent" />
            </div>


            <div className='text-center mt-8'>
                <textarea rows={4} onChange={handleChange} name="fullAddress" placeholder="Full Address" className="ps-1 text-sm resize-none w-56 text-gray-700 border-b focus:outline-none bg-transparent focus:bg-transparent" />
            </div>

            <div className="flex justify-center mt-4">

                <button onClick={previousStep} className='bg-black w-16 mx-2 text-white h-12' >Previous</button>
                <button onClick={nextStep} className='bg-black w-16 mx-2 text-white h-12' >Next</button>
                <button onClick={() => setIsModal(false)} className='bg-red-800 mx-2 w-16 text-white' >Cancel</button>

            </div>
        </div>

    )
}

export default StepTwo
