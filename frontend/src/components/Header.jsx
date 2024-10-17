import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    const { userData } = useAppContext();

    return (
        <header className="flex justify-between items-center py-2 px-4 bg-gray-100 shadow-lg">
            {/* Logo Section */}
            <div className="logo">
                <img
                    src="https://th.bing.com/th/id/OIP.5TGwYL4_VJNI8uyM2x8P0wHaF7?rs=1&pid=ImgDetMain"
                    width={70}
                    height={60}
                    alt="Logo"
                />
            </div>

            {/* Signup or User Info Section */}
            <div className="signup flex items-center">
                {userData ? (
                    <div className="flex items-center space-x-2">
                        {/* Show profile image and name */}
                        <img
                            src={`https://randomuser.me/api/portraits/men/75.jpg`} // Replace with actual field for profile picture
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-gray-700 font-semibold">
                            {/*data.firstName*/} {/*data.lastName*/}
                        </span>
                        <button className="border-2 border-orange-600 p-2">Sign Out</button>
                    </div>
                ) : (
                    <NavLink
                        to="/signup"
                        className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-600"
                    >
                        Signup
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
