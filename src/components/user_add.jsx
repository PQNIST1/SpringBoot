
const AddUser = () => {
    return(
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form action="/addUser" method="POST">
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                            First Name
                            </label>
                            <input type="text" name="name" id="name" placeholder="Full Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                Last Name
                            </label>
                            <input type="text" name="phone" id="phone" placeholder="Enter your phone number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                                Password
                            </label>
                            <input type="password" name="password" id="password" placeholder="Enter your password"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="role" className="mb-3 block text-base font-medium text-[#07074D]">
                                Role
                            </label>
                            <select id="role" name="role">
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </select>
                        </div>
                        <div>
                            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser;