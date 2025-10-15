import { useState } from "react"
import { WhyChooseItems } from "../../constants/WhyChooseConstants";

function Accordion() {
    const [active, setActive] = useState(1);


    return (
        <div>
            {WhyChooseItems.map((item) => (
                <div key={item.id} onClick={() => setActive(item.id)} className=" cursor-pointer hover:ease-in transition duration-150 hover:scale-105" >
                    <div>
                        <p style={{ fontFamily: "Roobert" }} className={`${active == item.id ? "bg-indigo-400 text-white" : ""} mx-auto p-2 text-xl text-white border`}>{item.header}</p>
                    </div>
                    <div className={`${active == item.id ? "block bg-indigo-100" : "hidden"}`}>
                        <p className={`p-4 text-sm text-gray-700`} style={{ fontFamily: "Roobert" }}> {item.txt} {"→"}</p>
                    </div>
                </div>

            ))
            }
        </div >
    )
}

export default Accordion
