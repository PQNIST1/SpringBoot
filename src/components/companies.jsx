const Companies = () => {
    return(
        <>
             <div className="bg-white p-8 overflow-auto h-screen">
                <div className="flex space-x-5">
                    <div className="w-1/2">
                    <h2 className="text-2xl mb-4 text-black">Danh sách công ty</h2>
                    </div>
                    <div className="w-1/2 flex justify-end">
                    <button className="w-[100px] border-2 bg-blue-500 text-white rounded-lg mr-10 hover:text-blue-200"><a href="/companies/add">Add</a></button>
                    </div>
                </div>

                <div className="relative overflow-auto">
                    <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-white border mb-20">
                        <thead>
                        <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                        <th className="p-0">
                            <span className="block py-2 px-3 border-r border-gray-300">ID</span>
                        </th>
                        <th className="p-0">
                            <span className="block py-2 px-3 border-r border-gray-300">Name</span>
                        </th>
                        <th className="p-4 text-xs md:text-sm">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b text-xs md:text-sm text-center text-gray-800">
                        <td className="p-2 md:p-4">a</td>
                        <td className="p-2 md:p-4">a</td>
                        <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                            <button className="bg-blue-500 text-white px-5 py-1 rounded-md text-xs md:text-sm hover:text-blue-200"><a href="/companies/update/1">Edit</a></button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:text-red-200"><a href="/companies/delete/1">Delete</a></button>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Companies;