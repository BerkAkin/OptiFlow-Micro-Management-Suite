import React from 'react'

interface DashboardInfoBoxProps {
    Header: string,
    Text: string,
    Color: string
}

function DashboardInfoBox({ Header, Text, Color }: DashboardInfoBoxProps) {
    return (
        <div className={`border bg-white justify-center rounded-sm flex shadow-sm grid grid-cols-[55%_45%] `}>
            <div className={`h-[50px] flex items-center justify-center`} style={{ fontFamily: "roobert" }}>
                <p className={`text-lg ps-1 text-gray-700 text-${Color}-600`}>
                    {Header}
                </p>
            </div>
            <div className={`border-s flex items-center justify-center`} style={{ fontFamily: "roobert" }}>
                <p className={`text-xl text-gray-700 ps-1 `}>
                    {Text}$
                </p>
            </div>
        </div>
    )
}

export default DashboardInfoBox
