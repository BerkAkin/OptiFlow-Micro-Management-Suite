import { createContext, useContext, useState } from 'react'


const SelectedModuleContext = createContext<any>(null);

export const SelectedModuleContextProvider = ({ children }: any) => {

    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [moduleParts, setModuleParts] = useState<{}[]>([{}]);

    const values = { selectedModule, setSelectedModule, moduleParts, setModuleParts };

    return (
        <SelectedModuleContext.Provider value={values}>
            {children}
        </SelectedModuleContext.Provider>
    )
}

export const useSelectedModuleContext = () => {
    return useContext(SelectedModuleContext);
}
