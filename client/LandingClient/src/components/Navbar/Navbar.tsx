import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";



function Navbar() {


  /* LOGIN ARTIK BAŞKA SEKMEDE OLACAK O YÜZDEN LOGİN MODALI KALDIRABİLİRİM */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsModal, setModalType } = useContext(ModalContext);

  const openLogin = () => {
    setIsModal(true);
    setModalType("login");
  }
  const openRegister = () => {
    setIsModal(true);
    setModalType("register");
  }

  const logout = () => {
    localStorage.removeItem("lgkey");
    setIsLoggedIn(false);
    window.location.reload()
  };

  useEffect(() => {
    const token = localStorage.getItem("lgkey");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (

    <nav className="bg-white h-[120px] border">
      <div className="grid h-[100%] grid-cols-3 gap-0">
        <div className="w-[100%] flex flex-wrap items-center justify-center mx-auto p-4">
          <span className="text-3xl font-semibold ">OptiFlow Management Suite</span>
        </div>

        <div className="w-[100%] flex flex-wrap items-center justify-center mx-auto p-4">
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Seçenekler</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="text-xl flex flex-col rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li >
                <a href="Modules" className="block text-gray-600 hover:text-indigo-500 ">Modules</a>
              </li>
              <li className="mx-10">
                <a href="" className="block  text-gray-600 md:dark:hover:text-indigo-500">Packages</a>
              </li>
              <li>
                <a href="" className="block text-gray-600 md:dark:hover:text-indigo-500">About Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[100%] flex flex-wrap items-center justify-center mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li>
                <a href="http://localhost:3000" target="_blank" className="text-center block bg-indigo-500 w-24 text-white py-2 px-3 md:p-0 hover:bg-indigo-700">Login</a>
              </li>
              <li>
                <button onClick={openRegister} className="border border-gray-400 w-24 block py-2 px-3 md:p-0 text-gray-600 md:dark:hover:text-indigo-500">Purchase</button>
              </li>
            </ul>
          </div>
        </div>
      </div>



    </nav>
  )
}

export default Navbar
