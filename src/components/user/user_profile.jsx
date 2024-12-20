import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../controller/SliceReducer/user";
import EditProfile from "./edit_profile";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, success } = useSelector((state) => state.user);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        dispatch(getUser(userId));
    }, [dispatch, success]);
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center p-6  text-white" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                    <div className="ml-6">
                        <h2 className="text-2xl font-bold">{user?.firstName}</h2>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">User Information</h3>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-medium text-gray-600">Company: {user?.companyName}</span>
                        </li>
                        <li>
                            <span className="font-medium text-gray-600">Roles: {user?.roles.join(', ')}</span>
                        </li>
                    </ul>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <div className="flex space-x-4 justify-end">
                        <EditProfile id={user?.id} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
