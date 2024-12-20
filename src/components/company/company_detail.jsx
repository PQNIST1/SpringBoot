import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCom } from "../../controller/SliceReducer/company";
import { Detail } from "./detail";
import { useParams } from 'react-router-dom';
import EmployModal from "./addEmploy";

const CompanyDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const form = useSelector((state) => state.company);
    const { status, company, success } = form;
    const [data, setData] = useState([]);
    const { searchQuery } = useSelector((state) => state.search);
    const [filter, setFilterData] = useState([]);
    useEffect(() => {
        dispatch(getCom(id));
    }, [dispatch, id, success]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(company);
        }
    }, [status, company]);
    useEffect(() => {
        if (data?.users) {
            const filteredData = data.users.slice().filter((item) =>
                item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
        }
    }, [data, searchQuery]);
    return (
        <div className="bg-white p-8 overflow-auto h-screen">
            <div className="flex space-x-5">
                <div className="w-1/2">
                    <h2 className="text-2xl mb-4 text-black">Company Name: {data?.name}</h2>
                </div>
                <div className="w-1/2 flex justify-end">
                    <button className=" border-2 bg-blue-500 text-white rounded-lg mr-10 hover:text-blue-200"><EmployModal id={data?.id} /></button>
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
                                    <span className="block py-2 px-3 border-r border-gray-300">First Name</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Last Name</span>
                                </th> <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Email</span>
                                </th>
                                <th className="p-4 text-xs md:text-sm">Action</th>
                            </tr>
                        </thead>
                        {filter?.length > 0 && (
                            filter
                                .slice() 
                                .sort((a, b) => a.id - b.id) 
                                .map((company) => (
                                    <Detail key={company.id} id={data.id} employee={company} />
                                ))
                        )}

                    </table>
                </div>
            </div>
        </div>

    )
}

export default CompanyDetail;