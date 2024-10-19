import { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from '../components/Userinfo';

import Logo from '../assets/logo-2.jpeg';

const Dashboard = () => {
    const [recordsLoading, setRecordsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);
    const [allRecordData, setAllRecordData] = useState(null);
    const [usersDataUpdated, setUsersDataUpdated] = useState(false);
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchUsersData() {
            try {
                const response = await axios.get(`${baseUrl}/api/user/getAllUsers`, {
                    withCredentials: true
                });
                if (response.data?.data) setUsersData(response.data.data);
                else throw new Error('Something went wrong in fetching users data');
            } catch (error) {
                console.error('Error in fetching users data');
                if (error instanceof Error) console.error(error.message);
                else console.error(error);
            }
        }

        fetchUsersData();
    }, [usersDataUpdated]);

    useEffect(() => {
        async function fetchAllCallsRecord() {
            try {
                setRecordsLoading(true);
                const response = await axios.get(`${baseUrl}/api/twilio/get-all-calls-record`, {
                    withCredentials: true
                });
                if (response.data?.data) setAllRecordData(response.data?.data);
                else throw new Error('Something went wrong in fetching all records data');
            } catch (error) {
                console.error('Error in fetching calls record');
                console.error(error.message || error);
            } finally {
                setRecordsLoading(false);
            }
        }

        fetchAllCallsRecord();
    }, []);

    return (
        <div className="min-h-[calc(100vh-120px)]">
            <div className="flex-1 p-8 ">
                <div className="mb-6 flex flex-col items-center gap-[40px]">
                    <img src={Logo} alt="logo" className="w-[150px] object-cover" />
                    <h1 className="text-xl font-semibold text-gray-800">Welcome to Admin Dashboard</h1>
                </div>

                {recordsLoading ? (
                    <div>Loading calls records...</div>
                ) : (
                    // <div className="flex flex-col justify-center gap-[10px] text-[16px] font-medium my-[20px]">
                    //     <p>Total Calls : {allRecordData.totalCallsMade}</p>
                    //     <p>Completed Calls : {allRecordData.completedCalls}</p>
                    //     <p>Canceled Calls: {allRecordData.canceledCalls}</p>
                    //     <p>Failed Calls : {allRecordData.failedCalls}</p>
                    //     <p>Unanswered Calls : {allRecordData.notAnswered}</p>
                    //     <p>Queued Calls : {allRecordData.queuedCalls}</p>
                    // </div>
                    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8">
                        <div className="bg-blue-500 text-white text-center py-2">
                            <h2 className="text-xl font-semibold">Call Statistics</h2>
                        </div>
                        <div className="p-2">
                            <table className="w-full text-left table-auto">
                                <tbody className="divide-y divide-gray-200">
                                <tr className="bg-blue-50">
                                    <td className="p-2 font-medium text-gray-700">Total Calls</td>
                                    <td className="p-2 text-right font-semibold text-blue-700">
                                        {allRecordData.totalCallsMade}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-medium text-gray-700">Completed Calls</td>
                                    <td className="p-2 text-right font-semibold text-blue-700">
                                        {allRecordData.completedCalls}
                                    </td>
                                </tr>
                                <tr className="bg-blue-50">
                                    <td className="p-2 font-medium text-gray-700">Canceled Calls</td>
                                    <td className="p-2 text-right font-semibold text-blue-700">
                                        {allRecordData.canceledCalls}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-medium text-gray-700">Failed Calls</td>
                                    <td className="p-2 text-right font-semibold text-blue-700">
                                        {allRecordData.failedCalls}
                                    </td>
                                </tr>
                                <tr className="bg-blue-50">
                                    <td className="p-2 font-medium text-gray-700">Unanswered Calls</td>
                                    <td className="p-2 text-right font-semibold text-blue-700">
                                        {allRecordData.notAnswered}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-medium text-gray-700">Queued Calls</td>
                                    <td className="p-2 text-right font-semibold text-blue-700">
                                        {allRecordData.queuedCalls}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* <div className="mb-4 flex items-center justify-between">
                        <div className="relative w-1/2">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <FaSearch className="absolute left-2 top-3 text-gray-500" />
                        </div>

                        <button className="ml-4 flex items-center bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-md  transition-colors">
                            <FaPlus className="mr-2" />
                            Add User
                        </button>
                    </div> */}

                {/* Table Header */}
                {/*<div className="grid grid-cols-6  gap-[8rem] font-medium text-sm text-gray-600 mb-4 bg-gray-200 p-4">*/}
                {/*    <h4>Username</h4>*/}
                {/*    <h4>Email</h4>*/}
                {/*    <h4>Role</h4>*/}
                {/*    <h4>Status</h4>*/}
                {/*</div>*/}
                <div className="grid grid-cols-4 gap-6 text-base text-white bg-blue-600 rounded-t-lg p-4 shadow-md">
                    <h4 className="font-semibold">Username</h4>
                    <h4 className="font-semibold">Email</h4>
                    <h4 className="font-semibold">Role</h4>
                    <h4 className="font-semibold">Status</h4>
                </div>


                {usersData.map((item) => (
                    <UserInfo key={item._id} user={item} setUsersDataUpdated={setUsersDataUpdated} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
