import PropTypes from "prop-types";

import DeleteCompany from "./deleteCompany";
import EditName from "./editName";
import { Link } from "react-router-dom";

export const Company = ({ companies }) => {
    return (
        <tbody>
            <tr className="border-b text-xs md:text-sm text-center text-gray-800">
                <td className="p-2 md:p-4">
                    {companies.id}
                </td>
                <td className="p-2 md:p-4">
                    <Link to={`/detail/${companies.id}`}>{companies.name}</Link>
                </td>
                <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                    <EditName id={companies.id} compannyName={companies.name} />
                    <DeleteCompany id={companies.id} />
                </td>
            </tr>
        </tbody>

    )
}

Company.propTypes = {
    companies: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};
