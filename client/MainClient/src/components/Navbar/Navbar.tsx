import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSelectedModuleContext } from "../../context/SelectedModuleContext";
import { Link } from "react-router-dom";



function Navbar() {

  const { isAuth, setIsAuth } = useAuthContext();
  const { setSelectedModule } = useSelectedModuleContext();

  return (

    <nav className="bg-white h-[80px] border">
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

          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">Dashboard</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/survey/surveys`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">Surveys</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">Suggestions</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">Permissions</Link>
            </ul>
          </div>
        </div>



        <div className="w-[100%] flex flex-wrap items-center justify-center mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">🧾</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">🗳️</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">👱🏻</Link>
            </ul>
          </div>

          <div className="hidden w-full md:block md:w-auto mx-5">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <button onClick={() => setSelectedModule(null)}> Profile</button>
            </ul>
          </div>

          <div className="hidden w-full md:block md:w-auto mx-5">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <button onClick={() => setSelectedModule(null)}> Modules</button>
            </ul>
          </div>

          <div className="hidden w-full md:block md:w-auto mx-5">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              {
                isAuth === true ? (<button onClick={() => setIsAuth(0)}> Logout</button>) : ("")
              }
            </ul>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
