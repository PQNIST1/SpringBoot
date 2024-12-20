import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../controller/SliceReducer/log";
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { loading, user } = useSelector((state) => state.log);
    const singUp = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(singUp));
    };

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);
    return (
        <div className="bg-gray-100 h-screen pt-[100px]">
            <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-900 dark:text-gray-200 mb-8">Register</h1>
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} >
                    <div className="flex gap-2">
                        <div className="flex w-1/2 items-start flex-col justify-start">
                            <label className=" text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full text-black px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>

                        <div className="flex w-1/2 items-start flex-col justify-start">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full text-black px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-black px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>

                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p>Register....</p>
                            </div>
                        ) : (
                            'Register'
                        )
                        }
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Already have an account? </span>
                    <Link href="/login" className="text-indigo-600 ">Login</Link>
                </div>
            </div>
        </div>

    )
}

export default Register;