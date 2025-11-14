import { useSelectedModuleContext } from "../../context/SelectedModuleContext";
import { modulePaths } from "../../config/modulePaths";

function ModuleSelection() {
    const { setSelectedModule, setModuleParts } = useSelectedModuleContext();

    return (
        <div className="mx-auto w-[950px] h-[600px] grid grid-cols-3 gap-8">
            {Object.entries(modulePaths).map(([moduleName, info]) => (
                <div key={moduleName} className={`${info.color.split(" ")[0]} text-center flex items-center justify-center rounded-sm`}>
                    <button
                        onClick={() => {
                            setSelectedModule(moduleName);
                            setModuleParts(info.parts);
                        }}
                        className={`text-white text-3xl p-5 h-full w-full transition duration-400 hover:scale-105 font-roobert ${info.color}`}>
                        {moduleName}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ModuleSelection;
