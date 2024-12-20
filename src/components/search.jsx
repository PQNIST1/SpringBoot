import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../controller/SliceReducer/search";


export const Search = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <div className="flex items-center px-4" >
            <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <input onChange={handleInputChange} value={inputValue} className="mx-4 w-full border rounded-md px-4 py-2 text-gray-600" type="text" placeholder="Search" />
        </div>
    )
}