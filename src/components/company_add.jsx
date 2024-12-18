import { useState } from 'react';

const AddCompany = () => {
    const [users, setUsers] = useState([]);

    const handleUserChange = (event) => {
        const userId = event.target.value;
        if (event.target.checked) {
            setUsers([...users, userId]);
        } else {
            setUsers(users.filter(id => id !== userId));
        }
    };

    return(
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form  method="post">
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                        Company Name
                        </label>
                        <input type="text" name="name" id="name" placeholder="Full Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <h3>User List</h3>
                        {users.map(user => (
                            <div key={user}>
                                <input type="checkbox" value={user} onChange={handleUserChange} />
                                <label>{user}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button 
                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Add
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCompany;