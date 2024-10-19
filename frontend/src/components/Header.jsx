import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import Logo from '../assets/logo-2.jpeg'

const Header = () => {
    const { userData, setUserData } = useAppContext();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    async function signOutUser() {
        try {
            localStorage.removeItem('realz_sol_user_data');
            setUserData(null);
            navigate('/');
            const response = await axios.get(`${baseUrl}/api/user/remove-cookie`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error(error.message || error);
        }
    }

    return (
        <header className="flex justify-between items-center py-2 px-4 bg-gray-100 shadow-lg">
            {/* Logo Section */}
            <div className="logo">
                <img
                    src={Logo}
                    width={120}
                    height={120}
                    alt="Logo"
                />
            </div>

            {/* Signup or User Info Section */}
            <div className="signup flex items-center">
                {userData ? (
                    <div className="flex items-center space-x-2">
                        {/* Show profile image and name */}
                        {/*<img*/}
                        {/*    src={`https://randomuser.me/api/portraits/men/75.jpg`} // Replace with actual field for profile picture*/}
                        {/*    alt="Profile"*/}
                        {/*    className="w-10 h-10 rounded-full object-cover"*/}
                        {/*/>*/}
                        <span className="text-gray-700 font-semibold">
                            {/*data.firstName*/} {/*data.lastName*/}
                        </span>
                        <button onClick={signOutUser} className="w-[100px] text-white rounded-[6px] bg-blue-600 p-2">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <NavLink
                        to="/signup"
                        className="w-[80px] text-white rounded-[6px] bg-blue-600 p-2 text-center"
                    >
                        Signup
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
