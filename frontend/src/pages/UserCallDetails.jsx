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
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-semibold mb-4">User Call Details for ID: {userId}</h1>

                {/* Call Records Table */}
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border px-4 py-2 text-left">ID</th>
                            <th className="border px-4 py-2 text-left">Sender</th>
                            <th className="border px-4 py-2 text-left">Receiver</th>
                            <th className="border px-4 py-2 text-left">Duration</th>
                            <th className="border px-4 py-2 text-left">Status</th>
                            <th className="border px-4 py-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callsData.map((call) => (
                            <tr key={call.sid} className="hover:bg-gray-100">
                                <td className="border px-4 py-2 text-left">{call.sid}.</td>
                                <td className="border px-4 py-2 text-left">{call.from}</td>
                                <td className="border px-4 py-2 text-left">{call.to}</td>
                                <td className="border px-4 py-2 text-left">{call.duration}s</td>
                                <td className="border px-4 py-2 text-left">{call.status}</td>
                                <td className="border px-4 py-2 text-left">{call.dateCreated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserCallDetails;
