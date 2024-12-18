
const UserProfile = () => {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "123 Main St, Springfield, USA",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
        profilePicture: "../../src/assets/acne-face-1-4.jpg",
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center p-6  text-white" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>
                    <img
                        className="w-24 h-24 rounded-full border-4 border-white"
                        src={user.profilePicture}
                        alt="User Profile"
                    />
                    <div className="ml-6">
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">User Information</h3>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-medium text-gray-600">Phone:</span> {user.phone}
                        </li>
                        <li>
                            <span className="font-medium text-gray-600">Address:</span> {user.address}
                        </li>
                        <li>
                            <span className="font-medium text-gray-600">Bio:</span> {user.bio}
                        </li>
                    </ul>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <div className="flex space-x-4 justify-end">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Edit Profile
                        </button>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
