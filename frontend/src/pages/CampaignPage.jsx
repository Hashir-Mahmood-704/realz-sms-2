import { useState } from 'react';
// import { useAppContext } from '../context/AppContext';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const CampaignPage = () => {
    const [campaignName, setCampaignName] = useState('');
    const [twilioSid, setTwilioSid] = useState('');
    const [twilioToken, setTwilioToken] = useState('');
    const [twilioNumber, setTwilioNumber] = useState('');
    const [callText, setCallText] = useState('');
    const [transferCallNumber, setTransferCallNumber] = useState('');
    const [transferDigit, setTransferDigit] = useState('');
    const [scriptText, setScriptText] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    // const { userData } = useAppContext();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form data after:');

        const formData = new FormData();
        formData.append('campaignName', campaignName);
        formData.append('twilioSid', twilioSid);
        formData.append('twilioToken', twilioToken);
        formData.append('twilioNumber', twilioNumber);
        formData.append('callText', callText);
        formData.append('transferCallNumber', transferCallNumber);
        formData.append('scriptText', scriptText);
        formData.append('file', csvFile);
        formData.append('transferDigit', transferDigit);

        try {
            const response = await axios.post('http://localhost:3000/api/twilio/create-campaign', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (response.data && response.data.message) {
                console.log('response data:', response.data);
                alert('Success: ' + response.data.message); // Log success message
            }
        } catch (error) {
            console.log('Error during form submission:', error);
            console.log('Form Data that caused error:', formData);
        }
    };

    // if (!userData.twilioSid) {
    //     return (
    //         <div className="min-h-screen flex justify-center items-center flex-col">
    //             <p className="text-2xl">You need to enter twilio credentials first!</p>
    //             <Link
    //                 to="/protected/twilio-credentials"
    //                 className="mt-[20px] bg-blue-600 text-white py-2 px-6 rounded-md text-lg"
    //             >
    //                 Enter Credentials
    //             </Link>
    //         </div>
    //     );
    // } else {
    return (
        <div className="min-h-screen bg-blue-50 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Credentials Fields */}
                    <div className="space-y-4">
                        <h1 className="font-bold">For twilio credentails</h1>

                        <div className="relative w-full">
                            <input
                                type="text"
                                id="twilioSid"
                                value={twilioSid}
                                onChange={(e) => setTwilioSid(e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Twilio SID"
                                required
                            />
                        </div>

                        <div className="relative w-full">
                            <input
                                type="text"
                                id="twilioToken"
                                value={twilioToken}
                                onChange={(e) => setTwilioToken(e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Twilio Token"
                                required
                            />
                        </div>

                        <div className="relative w-full">
                            <input
                                id="twilioNumber"
                                value={twilioNumber}
                                onChange={(e) => setTwilioNumber(e.target.value)}
                                placeholder="Enter Twilio Number"
                                className="w-full px-3 py-2 border border-blue-300 text-black rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Right Column: Campaign Details Fields */}
                    <div className="space-y-4">
                        <h1 className="font-bold">Upload phone numbers and file</h1>

                        <div className="relative w-full">
                            <input
                                type="text"
                                id="campaignName"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                className="w-full px-2 py-1 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Campaign Name"
                                required
                            />
                        </div>

                        <div className="relative w-full">
                            <textarea
                                id="callText"
                                value={callText}
                                onChange={(e) => setCallText(e.target.value)}
                                className="w-full px-2 py-1 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Call Text"
                                rows="3"
                                required
                            />
                        </div>

                        <div className="relative w-full">
                            <input
                                type="text"
                                id="transferCallNumber"
                                value={transferCallNumber}
                                onChange={(e) => setTransferCallNumber(e.target.value)}
                                className="w-full px-2 py-1 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Transfer Call Number"
                                required
                            />
                        </div>

                        <div className="relative w-full">
                            <input
                                type="number"
                                id="transferDigit"
                                min={1}
                                max={9}
                                value={transferDigit}
                                onChange={(e) => setTransferDigit(e.target.value)}
                                className="w-full px-2 py-1 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Transfer Call Digit"
                                required
                            />
                        </div>

                        <div className="relative w-full">
                            <textarea
                                id="scriptText"
                                value={scriptText}
                                onChange={(e) => setScriptText(e.target.value)}
                                className="w-full px-2 py-1 border border-blue-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="3"
                                placeholder="Script Text"
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label className="font-mono" htmlFor="csvFile">
                                Upload CSV File
                            </label>
                            <input
                                type="file"
                                id="csvFile"
                                onChange={(e) => setCsvFile(e.target.files[0])}
                                className="w-full px-2 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button inside form */}
                    <div className="mt-6 ml-[16.5rem] text-center col-span-2">
                        <button
                            type="submit"
                            className="w-60 bg-blue-600 text-white font-semibold py-2 rounded-sm hover:bg-blue-700 transition duration-300"
                        >
                            Initiate Call
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampaignPage;
