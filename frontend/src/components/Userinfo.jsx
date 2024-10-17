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
        <div className="relative grid grid-cols-6 gap-[8rem] items-center bg-white p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow text-sm">
            {/* Profile picture and name */}
            <div className="flex items-center space-x-1">
                {/* <input type="checkbox" name="" id="" />
                <img
                    src={user.profilePicture}
                    alt={`${user.name}'s profile`}
                    className="w-6 h-6 rounded-full"
                /> */}
                <span className="font-semibold text-gray-700 whitespace-nowrap">
                    {user.username}
                </span>
            </div>

            <span className="text-gray-600">{user.email}</span>
            <span className="text-gray-600">{user.role}</span>
            <span className={` ${user.status === 'active' ? 'text-blue-500' : 'text-red-500'}`}>
                {user.status}
            </span>
            {/* Three dots */}
            <div className="relative" ref={popupRef}>
                <FaEllipsisV
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={handleTogglePopup}
                />
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
