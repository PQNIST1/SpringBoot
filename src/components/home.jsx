import UserDetail from "./user/users";
import { useLocation } from "react-router-dom";
import Companies from "./company/companies";
import { useDispatch } from "react-redux";
import { logoutAndNavigate } from "../controller/SliceReducer/log";
import CompanyDetail from "./company/company_detail";
import UserProfile from "./user/user_profile";
import { Search } from "./search";

const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAndNavigate());
    }
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex flex-col w-64 bg-gray-800">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold uppercase">Sidebar</span>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 bg-gray-800">
                        <a href="/" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            User
                        </a>
                        <a href="/companies" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Companies
                        </a>
                        <a href="/profile" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Profile
                        </a>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                    <Search/>
                    <div className="flex items-center pr-4">

                        <button onClick={handleLogout}
                            className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                            </svg>


                        </button>
                    </div>
                </div>
                <div>
                    {location.pathname === '/companies' ? (
                        <Companies />
                    ) : location.pathname === '/profile' ? (
                        <UserProfile />
                    ) : location.pathname.startsWith('/detail/') ? (
                        <CompanyDetail />
                    ) : (
                        <UserDetail />
                    )}


                </div>
            </div>
        </div>
    )
}

export default Home;