import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserCallDetails = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [callsData, setCallsData] = useState([]);
    const baseUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        async function fetchSingleUserData() {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${baseUrl}/api/twilio/get-user-calls-records`,
                    { userId },
                    { withCredentials: true }
                );
                if (response.data?.data) setCallsData(response.data?.data);
            } catch (error) {
                console.error(error.message || error);
            } finally {
                setLoading(false);
            }
        }

        fetchSingleUserData();
    }, []);

    if (loading) return <div>Loading....</div>;
    else if (callsData.length < 1) return <div>User has no calls</div>;
    return (
        <div className='min-h-[calc(100vh-120px)]'>
            <div className="container mx-auto p-4">
                <h1 className="text-xl text-blue-600 font-semibold my-[30px]">User Call Details for ID: {userId}</h1>
                <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border border-blue-200 px-6 py-3 text-left font-semibold">ID</th>
                            <th className="border border-blue-200 px-6 py-3 text-left font-semibold">Sender</th>
                            <th className="border border-blue-200 px-6 py-3 text-left font-semibold">Receiver</th>
                            <th className="border border-blue-200 px-6 py-3 text-left font-semibold">Duration</th>
                            <th className="border border-blue-200 px-6 py-3 text-left font-semibold">Status</th>
                            <th className="border border-blue-200 px-6 py-3 text-left font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callsData.map((call) => (
                            <tr key={call.sid} className="hover:bg-blue-50 transition-colors">
                                <td className="border border-gray-300 px-6 py-3 text-left">{call.sid}</td>
                                <td className="border border-gray-300 px-6 py-3 text-left">{call.from}</td>
                                <td className="border border-gray-300 px-6 py-3 text-left">{call.to}</td>
                                <td className="border border-gray-300 px-6 py-3 text-left">{call.duration}s</td>
                                <td
                                    className={`border px-6 py-3 text-left ${call.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {call.status}
                                </td>
                                <td className="border border-gray-300 px-6 py-3 text-left">{call.dateCreated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserCallDetails;
