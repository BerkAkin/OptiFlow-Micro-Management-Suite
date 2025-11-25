import React, { useState } from 'react'

function StepFour({ handleChange, registerInfo, setRegisterInfo, previousStep, setIsModal }: any) {

    const [date, setDate] = useState<Date | null>(new Date());

    async function handleSubmit() {
        try {
            const res = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerInfo),
            });

            if (!res.ok) throw new Error("Kayıt başarısız!");
            console.log("Kayıt Başarılı")

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='border-white/10'>
            <div className='w-96 h-[450px] pt-6 bg-white rounded-sm space-y-6'>

                <div className="text-center">
                    <h1 className='text-4xl text-gray-700'>PURCHASE SUBSCRIPTION</h1>
                    <h1 className='text-lg text-gray-700 mt-6'><span>Payment Info</span></h1>
                </div>


                <div className='text-center '>
                    <input onChange={handleChange} type="text" name="nameAndSurname" placeholder="First and Last Name" className="w-56 h-8 ps-2 text-gray-700 border border-gray-200 focus:outline-none bg-transparent focus:bg-transparent" />
                </div>


                <div className='text-center '>
                    <input onChange={handleChange} type="text" name="cardNumber" placeholder="Card Number" className="w-56 h-8 ps-2 text-gray-700 border border-gray-200 focus:outline-none bg-transparent focus:bg-transparent" />

                </div>


                <div className='text-center '>

                </div>

                <div className='text-center flex justify-center text-gray-700  '>

                    <input onChange={handleChange} type="text" name="cvv" placeholder="CVV" className="w-10 text-center text-gray-700 border border-gray-200 focus:outline-none bg-transparent focus:bg-transparent" />
                    <p className=' ms-6 me-1 text-start text-gray-400'>Valid Date:</p>
                    <input name='validDateMonth' onChange={handleChange} className="w-4 text-sm text-gray-700 border border-gray-200 focus:outline-none bg-transparent focus:bg-transparent" />
                    <span className='mx-1'>/</span>
                    <input name='validDateYear' onChange={handleChange} className="w-4 text-sm text-gray-700 border border-gray-200 focus:outline-none bg-transparent focus:bg-transparent" />
                </div>



                <div className="flex justify-center mt-8">

                    <button onClick={previousStep} className='bg-black w-16 mx-1 text-white h-12' >Previous</button>
                    <button onClick={handleSubmit} className='bg-green-800 w-24 mx-2 text-white h-12' >Purchase</button>

                    <button onClick={() => setIsModal(false)} className='bg-red-800 mx-1 w-16 text-white' >Cancel</button>

                </div>
            </div>
        </div>

    )
}
export default StepFour
