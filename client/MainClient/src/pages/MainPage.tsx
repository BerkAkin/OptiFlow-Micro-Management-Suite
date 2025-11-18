import Navbar from '../components/Navbar/Navbar'
import LoginModal from '../components/LoginContainer/LoginContainer'
import { useAuthContext } from '../context/AuthContext'
import { Outlet } from 'react-router-dom'

function MainPage() {
    const { isAuth, setIsAuth } = useAuthContext();


    if (!isAuth) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <LoginModal />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="z-40">
                <Navbar />
            </div>
            <div className="overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage
