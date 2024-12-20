import { Modal, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEmploy, resetSuccess } from '../../controller/SliceReducer/company';


const DeleteEmploy = ({id, employId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);


   
    const dispatch = useDispatch();
    const { success, status } = useSelector((state) => state.company);


    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        dispatch(resetSuccess());
    };

   

    const handleConfirm = (e) => {
        const userId = [employId]
        e.preventDefault();
        dispatch(deleteEmploy({userId,id}));
        setIsOpen(false);
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
            <Button
                onClick={handleOpen}
               className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm hover:text-red-200"
            >
                Delete
            </Button>
            <Modal show={isOpen} onClose={handleClose}>
                <Modal.Header>
                    Confirmation
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col items-center text-center">
                        <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this item?
                        </h3>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-center">
                    <Button
                        color="failure"
                        onClick={handleConfirm}
                    >
                        Yes, I&apos;m sure
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                        No, cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Toast Notification */}
            {showSuccess && (
                <div className="fixed top-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg animate-slide-in-right" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">Item deleted successfully!</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            )}

            {/* Error Toast Notification */}
            {showError && (
                <div className="fixed top-0 right-0  flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg animate-slide-in-right" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">Failed to delete item. Please try again!</div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

DeleteEmploy.propTypes = {
    id: PropTypes.number.isRequired,
    employId: PropTypes.number.isRequired,
};

export default DeleteEmploy;
