import { Modal, Button, Label, TextInput, Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getUser, resetSuccess, updateUser } from '../../controller/SliceReducer/user';
import PropTypes from 'prop-types';

const EditModal = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roles, setRoles] = useState([]);
    const [availableRoles] = useState(['ROLE_ADMIN', 'ROLE_USER']);
    const [initialData, setInitialData] = useState(null);

    const dispatch = useDispatch();
    const { success, status, user } = useSelector((state) => state.user);




    const handleOpen = () => {
        setIsOpen(true);
        dispatch(getUser(id));
    };
    const handleClose = () => {
        setIsOpen(false);
        dispatch(resetSuccess());
    };

    useEffect(() => {
        if (user) {
            setInitialData(user);
            setFirstName(user.firstName);
            setEmail(user.email);
            setLastName(user.lastName);
            setPassword(user.password);
            setRoles(user.roles);
        }
    }, [user]);

    const clearForm = () => {
        setFirstName('');
        setEmail('');
        setLastName('');
        setPassword('');
    };

  

    const handleConfirm = (e) => {
        e.preventDefault();
        let update = {};
        if (firstName !== initialData?.firstName) {
          update.firstName = firstName;
        }
        if (lastName !== initialData?.lastName) {
          update.lastName = lastName;
        }
        if (email !== initialData?.email) {
          update.email = email;
        }
        if (password) {
          update.password = password;
        }
        if (roles !== initialData?.roles) {
          update.roles = roles;
        }
        
        console.log(update);
        // Gửi lên server nếu có thay đổi
        if (Object.keys(update).length > 0) {
          dispatch(updateUser({update,id}))
        }
        clearForm();
        setIsOpen(false);
      };

    const handleRoleChange = (role) => {
        setRoles((prevRoles) => {
          if (prevRoles.includes(role)) {
            // Nếu role đã có, bỏ chọn (xóa)
            return prevRoles.filter((r) => r !== role);
          } else {
            // Nếu role chưa có, thêm vào
            return [...prevRoles, role];
          }
        });
      };

    useEffect(() => {
        if (status === 'succeeded' && success) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                dispatch(resetSuccess());
                setIsOpen(false);
            }, 3000);
        } else if (status === 'failed') {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }, [status, success, dispatch]);

    return (
        <>
            <Button onClick={handleOpen} gradientDuoTone="blueToIndigo" className="bg-blue-500 text-white px-5 py-1 rounded-md text-xs md:text-sm hover:text-blue-200">
                Edit
            </Button>
            <Modal show={isOpen} onClose={handleClose}>
                <Modal.Header>Update User</Modal.Header>
                <Modal.Body>
                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="firstName" value="First Name" />
                                <TextInput
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName" value="Last Name" />
                                <TextInput
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="roles" value="Roles" />
                            <div className='flex gap-2'>
                                {availableRoles.map((role, index) => (
                                    <div key={index} className="flex items-center gap-2 mb-2">
                                        <Checkbox
                                            id={`role-${role}`}
                                            value={roles}
                                            checked={roles.includes(role)} // Đánh dấu nếu user có role này
                                            onChange={() => handleRoleChange(role)} // Thay đổi khi người dùng chọn checkbox
                                        />
                                        <Label htmlFor={`role-${role}`}>{role}</Label>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-700">
                                Roles: {roles.length > 0 ? roles.join(', ') : 'None'}
                            </p>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleConfirm} gradientDuoTone="greenToBlue">
                        Update User
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {showSuccess && (
                <div className="fixed top-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg animate-slide-in-right" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">User update successfully!</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            )}
            {showError && (
                <div className="fixed top-0 right-0  flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg animate-slide-in-right" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">Failed to update user. Please try again!</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

EditModal.propTypes = {
    id: PropTypes.number.isRequired,
};

export default EditModal;
