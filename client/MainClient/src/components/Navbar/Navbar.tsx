import { useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import MakeSuggestionCard from "../SuggestionComponents/MakeSuggestionCard/MakeSuggestionCard";
import happy from '../../assets/happy.svg'



function Navbar() {

  const { isAuth, setIsAuth } = useAuthContext();

  const [isSuggestion, setIsSuggestion] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInside = elementsRef.current.some((el) => el && el.contains(event.target as Node))
      if (!clickedInside) {
        setIsOpen(false)
        setIsSuggestion(false)
        setIsProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (

    <nav className="bg-white h-[80px] border border-gray-200">
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
              <Link to={`/finance/financeDashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">Finance Dashboard</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li className="relative" ref={(el) => { elementsRef.current[0] = el }} >
                <button className="cursor-pointer mt-2" onClick={() => setIsOpen(!isOpen)}>Survey ▼</button>
                {isOpen && (
                  <div className="absolute border-x border-b border-gray-200 right-0 translate-x-[25%] text-center mt-4 w-40 bg-white text-black rounded-b-lg shadow-lg z-10">
                    <Link onClick={() => setIsOpen(!isOpen)} to={`/survey/surveys`} className="block px-1 py-2 text-gray-900 hover:bg-gray-200 focus:bg-indigo-200">Surveys</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} to={`/survey/surveyBuilder`} className="block px-1 py-2 text-gray-900 hover:bg-gray-200 focus:bg-indigo-200">Builder</Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/suggest/suggestions`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">Suggestions</Link>
            </ul>
          </div>

        </div>



        <div className="w-[100%] flex flex-wrap items-center justify-center mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/financeBills`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">🧾</Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <div ref={(el) => { elementsRef.current[1] = el }} className="relative inline-block flex flex-col">
              <button onClick={() => setIsSuggestion(!isSuggestion)} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200">🗳️</button>
              {isSuggestion && <MakeSuggestionCard />}
            </div>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-1">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`moodRecords`} className="block px-4 py-2 mt-2 text-xl text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={happy} alt="" /></Link>
            </ul>
          </div>

          <div className="hidden w-full md:block md:w-auto mx-5">
            {
              isAuth === true ? (
                <div ref={(el) => { elementsRef.current[2] = el }} className="relative ">
                  <button className="cursor-pointer border border-gray-200 rounded-full size-10" onClick={() => setIsProfile(!isProfile)}></button>
                  {isProfile &&
                    <div className='absolute border border-gray-200 h-80 w-72 bg-white shadow-lg rounded-lg z-20 left-1/2 -translate-x-1/2 transform top-16'>
                      <div className="flex justify-center mt-4">
                        <p className="border border-gray-200 rounded-full size-32"></p>
                      </div>
                      <div className="flex justify-center my-4">
                        <Link to={'profile'} className="text-xl text-gray-500 hover:text-gray-700">My Profile</Link>
                      </div>

                      <div className="flex justify-center">
                        <button className="text-xl text-red-500 hover:text-red-700" onClick={() => setIsAuth(0)}> Logout</button>
                      </div>
                    </div>
                  }
                </div>
              ) : ("")

            }
          </div>
        </div>

      </div>
    </nav >
  )
}

export default Navbar
