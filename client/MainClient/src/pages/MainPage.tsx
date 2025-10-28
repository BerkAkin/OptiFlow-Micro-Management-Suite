import { useState } from 'react'
import ModuleSelection from '../components/ModuleSelection/ModuleSelection'
import Navbar from '../components/Navbar/Navbar'
import LoginModal from '../components/LoginContainer/LoginContainer'
import Sidebar from '../components/Sidebar/Sidebar'
import { useSelectedModuleContext } from '../context/SelectedModuleContext'
import { useAuthContext } from '../context/AuthContext'
import { Outlet } from 'react-router-dom'

function MainPage() {
    const { selectedModule } = useSelectedModuleContext();
    const { isAuth, setIsAuth } = useAuthContext();


    return (
        <div>

            <Navbar />


            <div>
                {
                    !isAuth ?
                        (
                            <div className='flex items-center justify-center h-[90dvh]'>
                                <LoginModal />
                            </div>
                        )
                        : selectedModule === null ?

                            (
                                <div className='flex items-center justify-center h-[90dvh]'>
                                    <ModuleSelection />
                                </div>
                            )
                            :

                            (
                                <div className=" grid grid-cols-[15%_85%] h-[90dvh]">
                                    <div className='border-e h-[100%]'>
                                        <Sidebar />
                                    </div>
                                    <div className='h-[100%] overflow-scroll bg-gray-100'>
                                        <Outlet />
                                    </div>

                                </div>
                            )
                }
            </div>


        </div>
    )
}

export default MainPage
