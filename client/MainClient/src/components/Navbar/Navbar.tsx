import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router";
import MakeSuggestionCard from "../SuggestionComponents/MakeSuggestionCard/MakeSuggestionCard";
import SupportRequestCard from "../SupportComponents/SupportRequestCard/SupportRequestCard";
import RoleBasedGuard from "../RoleBasedGuard/RoleBasedGuard";
import happy from '../../assets/happy.svg'
import suggestion from '../../assets/suggestion.svg'
import bill from '../../assets/bill.svg'
import help from '../../assets/help.svg'
import finance from '../../assets/finance.svg'
import survey from '../../assets/survey.svg'
import helpRequest from '../../assets/helpRequest.svg'
import makeSuggestion from '../../assets/makeSuggestion.svg'
import icon from '../../assets/icon.png'

function Navbar() {
  const { isAuth, handleLogoutState, userInfo } = useAuthContext();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  const toggleMenu = (menuName: string) => {
    setActiveMenu(prev => prev === menuName ? null : menuName);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInside = elementsRef.current.some((el) => el && el.contains(event.target as Node));
      if (!clickedInside) setActiveMenu(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkStyle = (path: string) =>
    `p-2 rounded-xl transition-all duration-200 hover:bg-indigo-50 group ${location.pathname.includes(path) ? 'bg-indigo-50 ring-1 ring-indigo-100' : ''}`;

  return (
    <nav className="h-[80px] w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-100">
      <div className="container mx-auto h-full flex items-center justify-between px-4">

        <Link to="/" className="flex items-center gap-2 group">
          <div>
            <img src={icon} width={32} alt="TideFlow" />
          </div>
          <span className="text-3xl font-bold text-slate-800 tracking-tight hidden lg:block">
            TideFlow <span className="text-blue-600">Suite</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4 p-1.5">
          <RoleBasedGuard allowedDepartments={["Finance Accountant", 'Manager']}>
            <Link to="/finance/dashboard" className={navLinkStyle('/finance')}><img width={24} src={finance} alt="Finance" title="Finance" /></Link>
          </RoleBasedGuard>

          <div className="relative" ref={(el) => { elementsRef.current[0] = el }}>
            <button onClick={() => toggleMenu('survey')} className={navLinkStyle('/survey')}>
              <img width={24} src={survey} alt="Survey" />
            </button>
            {activeMenu === 'survey' && (
              <div
                className="absolute mt-3 right-0 w-48 bg-white border border-gray-200 shadow-custom rounded-xl overflow-hidden p-1 animate-in fade-in slide-in-from-top-2">
                <Link to="/survey/dashboard" onClick={() => setActiveMenu(null)} className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-100 rounded-lg">Surveys</Link>
                <RoleBasedGuard allowedDepartments={["HR", 'Manager']}>
                  <Link to="/survey/builder" onClick={() => setActiveMenu(null)} className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-100 rounded-lg">Create Survey</Link>
                </RoleBasedGuard>
              </div>
            )}
          </div>

          <Link to="/suggest/dashboard" className={navLinkStyle('/suggest')}><img width={24} src={suggestion} alt="Suggestions" /> </Link>

          <Link to="/support/dashboard" className={navLinkStyle('/support')}><img width={24} src={help} alt="Support" /></Link>
        </div>

        <div className="flex items-center gap-1 md:gap-3">

          <div className="flex items-center border-r border-gray-100 pr-2 md:pr-4 gap-1">
            <div ref={(el) => { elementsRef.current[3] = el }} className="relative">
              <button onClick={() => toggleMenu('help')} className="p-2 hover:bg-orange-50 rounded-xl transition-colors">
                <img width={24} src={helpRequest} alt="Help Request" />
              </button>
              {activeMenu === 'help' && <SupportRequestCard />}
            </div>

            <RoleBasedGuard allowedDepartments={["Finance Accountant", 'Manager']}>
              <Link to="/finance/bill" className="p-2 hover:bg-emerald-50 rounded-xl transition-colors"><img width={24} src={bill} alt="Bills" /> </Link>
            </RoleBasedGuard>

            <div ref={(el) => { elementsRef.current[1] = el }} className="relative">
              <button onClick={() => toggleMenu('suggestion')} className="p-2 hover:bg-amber-50 rounded-xl transition-colors">
                <img width={24} src={makeSuggestion} alt="Make Suggestion" />
              </button>
              {activeMenu === 'suggestion' && <MakeSuggestionCard />}
            </div>

            <Link to="/mood/dashboard" className="p-2 hover:bg-pink-50 rounded-xl transition-colors"> <img width={24} src={happy} alt="Mood" /></Link>
          </div>

          {isAuth && (
            <div className="relative pl-2" ref={(el) => { elementsRef.current[2] = el }}>
              <button onClick={() => toggleMenu('profile')} className="flex items-center gap-2 p-1 cursor-pointer rounded-full hover:bg-gray-200 transition-all">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {userInfo?.username?.charAt(0).toUpperCase()}
                </div>
              </button>

              {activeMenu === 'profile' && (
                <div className="absolute top-full mt-3 right-0 w-56 bg-white border border-gray-200 shadow-custom rounded-xl p-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50 mb-2">
                    <p className="text-sm font-bold text-slate-800">{userInfo?.username}</p>
                    <p className="text-[10px] text-slate-400 truncate">{userInfo?.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setActiveMenu(null)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><span>My Profile</span></Link>
                  <RoleBasedGuard allowedDepartments={["HR", 'Manager']}>
                    <Link to="/addnewemployee" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><span>Add New Employee</span></Link>
                  </RoleBasedGuard>
                  <button onClick={() => { handleLogoutState(); setActiveMenu(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-100 rounded-lg transition-colors mt-1">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;