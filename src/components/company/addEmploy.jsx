import { Modal, Button, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  resetSuccess } from '../../controller/SliceReducer/user';
import { addEmploy, getCompanyUser } from '../../controller/SliceReducer/company';
import PropTypes from 'prop-types';

const EmployModal = ({id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const dispatch = useDispatch();
    const { success, status, users } = useSelector((state) => state.company);

    const handleUserChange = (event) => {
        const { value, checked } = event.target;

        setSelectedUsers((prevSelectedUsers) => {
            if (checked) {
                // Thêm ID người dùng vào danh sách
                return [...prevSelectedUsers, parseInt(value)];
            } else {
                // Loại bỏ ID người dùng khỏi danh sách
                return prevSelectedUsers.filter(userId => userId !== parseInt(value));
            }
        });
    };

    const handleOpen = () => {
        setIsOpen(true)
        dispatch(getCompanyUser());
    };
    const handleClose = () => {
        setIsOpen(false);
        dispatch(resetSuccess());
        setSelectedUsers([]);
    };

   

    const handleConfirm = (e) => {
        const userIds = selectedUsers;
        e.preventDefault();
        dispatch(addEmploy({userIds, id}))
        setIsOpen(false);
        setSelectedUsers([]);
                  
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
            <Button onClick={handleOpen} gradientDuoTone="blueToIndigo">
                Add
            </Button>

            <Modal show={isOpen} onClose={handleClose}>
                <Modal.Header>Add New Employee</Modal.Header>
                <Modal.Body>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="users" value="Select Employees" />
                            <div className="space-y-2">
                                {users.map((user) => (
                                    <div key={user.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`user-${user.id}`}
                                            value={user.id}
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={handleUserChange}
                                            className="mr-2"
                                        />
                                        <Label htmlFor={`user-${user.id}`}>{user.firstName}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleConfirm} gradientDuoTone="greenToBlue">
                        Add New Company
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {showSuccess && users && (
                <div className="fixed top-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg animate-slide-in-right" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">Employee add successfully!</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            )}
            {showError && users && (
                <div className="fixed top-0 right-0  flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg animate-slide-in-right" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">Failed to add empolyee. Please try again!</div>
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

EmployModal.propTypes = {
        id: PropTypes.number.isRequired,
};

export default EmployModal;
