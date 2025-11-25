import { useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import MakeSuggestionCard from "../SuggestionComponents/MakeSuggestionCard/MakeSuggestionCard";
import happy from '../../assets/happy.svg'
import suggestion from '../../assets/suggestion.svg'
import bill from '../../assets/bill.svg'
import help from '../../assets/help.svg'
import rating from '../../assets/rating.svg'
import finance from '../../assets/finance.svg'
import survey from '../../assets/survey.svg'
import makeSuggestion from '../../assets/makeSuggestion.svg'



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
      <div className="grid h-[100%] grid-cols-12 gap-0">

        <div className="col-span-3 w-[100%] flex flex-wrap items-center justify-center mx-auto p-4">
          <span className="text-3xl font-semibold ">OptiFlow Management Suite</span>
        </div>

        <div className="col-span-6 space-x-6 w-[100%] flex flex-wrap items-center justify-center p-4">

          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Seçenekler</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/dashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={finance} alt="" /></Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="text-xl flex flex-col md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li onClick={() => setIsOpen(!isOpen)} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200 relative" ref={(el) => { elementsRef.current[0] = el }} >
                <img width={30} src={survey} alt="" />
                {isOpen && (
                  <div className="absolute border-x border-b border-gray-200 right-0 translate-x-[30%] text-center mt-4 w-40 bg-white text-black rounded-b-lg shadow-lg z-10">
                    <Link onClick={() => setIsOpen(!isOpen)} to={`/survey/dashboard`} className="block px-1 py-2 text-gray-900 hover:bg-gray-200 focus:bg-indigo-200">Surveys</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} to={`/survey/builder`} className="block px-1 py-2 text-gray-900 hover:bg-gray-200 focus:bg-indigo-200">Builder</Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/suggest/dashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={suggestion} alt="" /></Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/help/dashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={help} alt="" /></Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/rate/dashboard`} className="block px-4 py-2 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={rating} alt="" /></Link>
            </ul>
          </div>
        </div>



        <div className="col-span-3 w-[100%] flex flex-wrap items-center justify-center ">
          <div className="hidden w-full md:block md:w-auto ">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`/finance/bill`} className="block px-4 mt-2 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={bill} alt="" /></Link>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-auto mx-2">
            <div ref={(el) => { elementsRef.current[1] = el }} className="relative inline-block flex flex-col">
              <button onClick={() => setIsSuggestion(!isSuggestion)} className="block px-4 mt-4 text-md text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={makeSuggestion} alt="" /></button>
              {isSuggestion && <MakeSuggestionCard />}
            </div>
          </div>
          <div className="hidden w-full md:block md:w-auto ">
            <ul className="text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <Link to={`mood/dashboard`} className="block px-4  mt-2 text-xl text-gray-900 bg-transparent rounded-sm hover:bg-gray-200 focus:bg-indigo-200"><img width={30} src={happy} alt="" /></Link>
            </ul>
          </div>

          <div className="hidden w-full md:block md:w-auto ms-2 pt-3">
            {
              isAuth === true ? (
                <div ref={(el) => { elementsRef.current[2] = el }} className="relative ">
                  <button className="cursor-pointer border border-gray-200 rounded-full size-8" onClick={() => setIsProfile(!isProfile)}></button>
                  {isProfile &&
                    <div className='absolute border border-gray-200 h-56 w-48 bg-white shadow-lg rounded-lg z-20 left-1/2 -translate-x-1/2 transform top-14'>
                      <div className="flex justify-center mt-4">
                        <p className="border border-gray-200 rounded-full size-24"></p>
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
