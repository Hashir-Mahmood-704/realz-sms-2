import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';

const MakeCall = () => {
    const { userData } = useAppContext();
    const [number, setNumber] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!number) {
            alert('Number is required');
            return;
        }
        try {
            const body = {
                twilioSid: userData.twilioSid,
                twilioToken: userData.twilioToken,
                twilioNumber: userData.twilioNumber,
                receiverNumber: number,
            };
            const response = await axios.post('http://localhost:3000/api/twilio/send-call', body, {
                withCredentials: true,
            });
            if (response.statusText === 'OK') alert('Call is send successfully');
            else {
                alert('Unable to send call, something went wrong');
                throw new Error('Unable to send call, something went wrong');
            }
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }
    }

    if (!userData.twilioSid) {
        return (
            <div className="min-h-screen flex justify-center items-center flex-col">
                <p className="text-2xl">You need to enter twilio credentials first!</p>
                <Link
                    to="/protected/twilio-credentials"
                    className="mt-[20px] bg-gradient-to-r from-orange-500 to-pink-600  text-white py-2 px-6 rounded-md text-lg"
                >
                    Enter Credentials
                </Link>
            </div>
        );
    } else {
        return (
            <div className="min-h-screen flex justify-center items-center flex-col">
                <h1 className="text-3xl font-medium">Send Twilio Call</h1>
                <form
                    onSubmit={handleSubmit}
                    className="border-2 border-orange-500 rounded-[10px] p-6 max-w-[1200px] flex flex-col gap-10 my-[50px]"
                >
                    <input
                        type="text"
                        placeholder="Enter number"
                        className="outline-none border p-3 w-[400px]"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-pink-600  text-white py-2 px-6 rounded-md text-lg"
                    >
                        Send Call
                    </button>
                </form>
            </div>
        );
    }
};

export default MakeCall;
