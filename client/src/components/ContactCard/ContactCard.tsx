
interface ContactCardProps {
    item: {
        icon: string,
        header: string,
        text: string
    }
}

function ContactCard({ item }: ContactCardProps) {
    return (
        <div className="pt-4 h-[100%] shadow-[10px_0px_8px_0px_rgba(0,_0,_0,_0.1)] hover:translate-x-2 cursor-pointer hover:ease-in transition duration-150">
            <div className="pt-8 ps-8">
                <div className="border p-2 bg-indigo-500 rounded-sm size-12">
                    <img src={item.icon} />
                </div>
            </div>
            <div className="ps-8 py-4">
                <div className="font-bold text-xl text-gray-800">
                    <h1 style={{ fontFamily: "roobert" }}>{item.header}</h1>
                </div>
            </div>
            <div className="ps-8">
                <h1 className="text-gray-600">
                    {item.text}
                </h1>
            </div>
        </div>
    )
}

export default ContactCard
