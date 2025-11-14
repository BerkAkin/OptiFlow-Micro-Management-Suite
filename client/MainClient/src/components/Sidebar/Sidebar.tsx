import { Link } from 'react-router-dom'
import { useSelectedModuleContext } from '../../context/SelectedModuleContext'


function Sidebar() {
    const { selectedModule, moduleParts } = useSelectedModuleContext()
    return (
        <div>
            <div className="flex flex-col w-full bg-white">
                <div className=" px-8 py-4 flex flex-row items-center justify-between">
                    <a className="text-xl text-indigo-500 font-semibold text-gray-800 font-roobert">{selectedModule}</a>

                </div>
                <nav className="px-4 ">
                    {moduleParts.map((item: { url: string, module: string }, index: number) => (
                        <>
                            <Link to={`${item.url}`} className="block px-4 py-2 mt-2 text-sm text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">{item.module}</Link>
                        </>
                    ))}

                </nav>
            </div>
        </div>
    )
}

export default Sidebar
