import CompanyModal from "./company_add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../controller/SliceReducer/company";
import { Company } from "./company";

const Companies = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.company);
    const { status, companies, success } = form;
    const [filter, setFilterData] = useState([]);
    const [data, setData] = useState([]);
    const { searchQuery } = useSelector((state) => state.search);
    useEffect(() => {
        dispatch(getCompany());
    }, [dispatch, success]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(companies);
        }
    }, [status, companies]);
    useEffect(() => {
        if (data) {
            const filteredData = data.slice().filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
        }
    }, [data, searchQuery]);
    return (
        <div className="bg-white p-8 overflow-auto h-screen">
            <div className="flex space-x-5">
                <div className="w-1/2">
                    <h2 className="text-2xl mb-4 text-black">Companise List</h2>
                </div>
                <div className="w-1/2 flex justify-end">
                    <button className=" border-2 bg-blue-500 text-white rounded-lg mr-10 hover:text-blue-200"><CompanyModal /></button>
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
                        {filter && filter.length > 0 && (
                            filter.map((company) => (
                                <Company key={company.id} companies={company} />
                            ))
                        )}
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Companies;