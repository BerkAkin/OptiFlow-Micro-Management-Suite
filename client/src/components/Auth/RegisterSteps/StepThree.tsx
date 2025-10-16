import { MicroPlan, MidiPlan, MacroPlan } from "../../../constants/PacksConstants"

import PackCard from '../../PackCard/PackCard';

function StepThree({ handleChange, previousStep, nextStep, setIsModal }: any) {



    return (
        <div>
            <div className="text-center">
                <h1 className='text-4xl text-white'>PURCHASE SUBSCRIPTION</h1>
                <h1 className='text-lg text-white my-6'><span className="border-b">Plan Selection</span></h1>
            </div>
            <div className="flex items-center justify-center">

                <PackCard Text="TempText1" ButtonText="Select" Price={700} Header="Micro Plan" HeaderBg="indigo-400" Height={560} Width={96} IsHover={false} SingleItems={MicroPlan} />

                <PackCard Text="TempText2" ButtonText="Select" Price={1000} Header="Macro Plan" HeaderBg="indigo-500" Height={620} Width={96} IsHover={false} SingleItems={MacroPlan} />

                <PackCard Text="TempText3" ButtonText="Select" Price={900} Header="Midi Plan" HeaderBg="indigo-400" Height={560} Width={96} IsHover={false} SingleItems={MidiPlan} />


            </div>

            <div className='grid grid-cols-3 flex mt-9'>
                <div className='justify-center flex'>
                    <input onChange={handleChange} type="radio" name="packSelection" value="Economic" className=" h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-red-400" />
                </div>
                <div className=' justify-center flex'>
                    <input onChange={handleChange} type="radio" name="packSelection" value="General" className=" h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-purple-400" />
                </div>
                <div className=' justify-center flex'>
                    <input onChange={handleChange} type="radio" name="packSelection" value="Full" className=" h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-yellow-400" />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={previousStep} className='bg-black w-36 mx-2 text-white h-12' >Previous</button>
                <button onClick={nextStep} className='bg-black  w-36 mx-2 text-white h-12' >Next</button>
                <button onClick={() => setIsModal(false)} className='bg-red-800 mx-2 w-36 text-white' >Cancel</button>
            </div>

        </div>
    )
}

export default StepThree
