import PropTypes from "prop-types";
import DeleteEmploy from "./deleteEmploy";


export const Detail = ({ employee, id }) => {
    return (
        <tbody>
            <tr className="border-b text-xs md:text-sm text-center text-gray-800">
                <td className="p-2 md:p-4">{employee.id}</td>
                <td className="p-2 md:p-4">{employee.firstName}</td>
                <td className="p-2 md:p-4">{employee.lastName}</td>
                <td className="p-2 md:p-4">{employee.email}</td>
                <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                <DeleteEmploy id={id} employId={employee.id}/>
                </td>
            </tr>
        </tbody>

    )
}

Detail.propTypes = {
    employee: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
};
