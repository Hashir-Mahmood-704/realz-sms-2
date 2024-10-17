/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopupMenu = ({ user, onClose, setUsersDataUpdated }) => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    const handleCallDetails = () => {
        onClose();
        navigate(`../user-call-details/${user._id}`); // Navigate to the call details page with the user ID
    };

    async function updateUserStatus() {
        try {
            const body = {
                userId: user._id,
                status: user.status === 'active' ? 'unactive' : 'active',
            };
            const response = await axios.put(`${baseUrl}/api/user/updateUserStatus`, body, {
                withCredentials: true,
            });
            if (response.statusText === 'OK') {
                setUsersDataUpdated((prev) => !prev);
                onClose();
            }
        } catch (error) {
            console.error(error.message || error);
        }
    }

    return (
        <div className="absolute top-1 right-2 z-10 bg-white border rounded-md shadow-lg w-48">
            <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleCallDetails} // Use the handleCallDetails function
            >
                Call Details
            </div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={updateUserStatus}>
                {user.status === 'active' ? 'Deactivate' : 'Activate'}
            </div>
        </div>
    );
};

export default PopupMenu;
