import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../controller/SliceReducer/log";
import {jwtDecode} from 'jwt-decode';



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState('');
    const { loading, user } = useSelector((state) => state.log);
    const singIn = {
        "email": email,
        "password": password
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(singIn));
    };

    useEffect(() => {
        if (user) {
            const token = localStorage.getItem('accessToken');
            const decoded = jwtDecode(token); 
            const roles = decoded.role;
            const isAdmin = roles.some(role => role.name === 'ROLE_ADMIN');
            if (isAdmin) {
                navigate('/', { replace: true });
            } else {
                navigate('/profile',{replace:true});
            }
        }
    }, [user, navigate]);


    return (
        <div className="bg-gray-100">
            <div className="flex h-screen flex-col justify-center py-6 sm:px-6 lg:px-8">
                <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-black">
                        Login
                    </h2>

                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email address</label>
                                <div className="mt-1">
                                    <input value={email} name="email" onChange={(e) => setEmail(e.target.value)} id="email" type="text"  required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 text-black dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" data-testid="password"
                                        autoComplete="current-password" required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 text-black dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 disabled:cursor-wait disabled:opacity-50" />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-white">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a className="font-medium text-indigo-400 hover:text-indigo-500" href="">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button data-testid="login" type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:border-transparent dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <p>Sign In....</p>
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )
                                    }

                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-gray-700 px-2 text-gray-500 dark:text-white">Or continue with</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-500 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 disabled:cursor-wait disabled:opacity-50">
                                    <span className="sr-only">Sign in with Google</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <clipPath id="p.0">
                                            <path d="m0 0l20.0 0l0 20.0l-20.0 0l0 -20.0z" clipRule="nonzero"></path>
                                        </clipPath>
                                        <g clipPath="url(#p.0)">
                                            <path fill="currentColor" fillOpacity="0.0" d="m0 0l20.0 0l0 20.0l-20.0 0z"
                                                fillRule="evenodd"></path>
                                            <path fill="currentColor"
                                                d="m19.850197 8.270351c0.8574047 4.880001 -1.987587 9.65214 -6.6881847 11.218641c-4.700598 1.5665016 -9.83958 -0.5449295 -12.08104 -4.963685c-2.2414603 -4.4187555 -0.909603 -9.81259 3.1310139 -12.6801605c4.040616 -2.867571 9.571754 -2.3443127 13.002944 1.2301085l-2.8127813 2.7000687l0 0c-2.0935059 -2.1808972 -5.468274 -2.500158 -7.933616 -0.75053835c-2.4653416 1.74962 -3.277961 5.040613 -1.9103565 7.7366734c1.3676047 2.6960592 4.5031037 3.9843292 7.3711267 3.0285425c2.868022 -0.95578575 4.6038647 -3.8674583 4.0807285 -6.844941z"
                                                fillRule="evenodd"></path>
                                            <path fill="currentColor" d="m10.000263 8.268785l9.847767 0l0 3.496233l-9.847767 0z"
                                                fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </button>
                                <button
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-500 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 disabled:cursor-wait disabled:opacity-50">
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.689v-3.622h3.131V8.413c0-3.1 1.893-4.788 4.656-4.788 1.324 0 2.462.099 2.795.143v3.243l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                        <div className="m-auto mt-6 w-fit md:mt-8">
                            <span className="m-auto text-gray-500">Do not have an account?
                                <Link className="font-semibold text-indigo-600 dark:text-indigo-100" to={'/register'}>Create Account</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;