/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import PopupMenu from './PopupMenu'; // Import the PopupMenu component

const UserInfo = ({ user, setUsersDataUpdated }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null); // Create a ref for the popup menu

    const handleTogglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false); // Close the popup if click is outside of it
        }
    };

    useEffect(() => {
        // Add event listener to detect clicks outside of the popup
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 items-center bg-white p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow text-sm relative">
            {/* Username */}
            <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 whitespace-nowrap">{user.username}</span>
            </div>

            {/* Email */}
            <span className="text-gray-600">{user.email}</span>

            {/* Role */}
            <span className="text-gray-600">{user.role}</span>

            {/* Status */}
            <span className={`font-medium ${user.status === 'active' ? 'text-blue-500' : 'text-red-500'}`}>
                {user.status}
            </span>

            {/* Three dots menu */}
            <div className="flex justify-end absolute right-[30px] top-[20px]">
                <FaEllipsisV className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleTogglePopup} />
                {showPopup && (
                    <PopupMenu
                        user={user}
                        onClose={() => setShowPopup(false)}
                        setUsersDataUpdated={setUsersDataUpdated}
                    />
                )}
            </div>
        </div>
    );
};

export default UserInfo;
