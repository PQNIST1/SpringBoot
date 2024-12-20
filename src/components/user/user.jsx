import PropTypes from 'prop-types';
import DeleteModal from '../deleteModal';
import EditModal from './editModal';
const User = ({ user }) => {
  return (
    <tbody>
      <tr className="border-b text-xs md:text-sm text-center text-gray-800">
        <td className="p-2 md:p-4">{user.id}</td>
        <td className="p-2 md:p-4">{user.firstName}</td>
        <td className="p-2 md:p-4">{user.lastName}</td>
        <td className="p-2 md:p-4">{user.email}</td>
        <td className="p-2 md:p-4">{user.roles.join(', ')}</td>
        <td className="p-2 md:p-4">{user.companyName}</td>
        <td className="relative p-2 md:p-4 flex justify-center space-x-2">
          <EditModal id={user.id}/>
          <DeleteModal id={user.id} />
        </td>
      </tr>
    </tbody>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    roles: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
