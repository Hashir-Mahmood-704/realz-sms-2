import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const TwilioCredentials = () => {
    const [twilioSid, setTwilioSid] = useState('');
    const [twilioToken, setTwilioToken] = useState('');
    const [twilioNumber, setTwilioNumber] = useState('');
    const { setUserData, userData } = useAppContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!twilioSid || !twilioToken || !twilioNumber) {
                alert('All fields required!');
                return;
            }
            const body = {
                userId: userData._id,
                twilioSid,
                twilioToken,
                twilioNumber,
            };
            console.log("body ",body);
            
            const response = await axios.post(
                'http://localhost:3000/api/twilio/update-credentials',
                body,
                { withCredentials: true }
            );
            console.log("response",response);
            
            if (response.data.data) {
                console.log("response data",response.data.data);
                
                setUserData(response.data.data);
                localStorage.setItem('realz_sol_user_data', JSON.stringify(response.data.data));
                navigate('/protected/');
            } else throw new Error('Something went wrong in updating user twilio credentials');

           

        } catch (error) {
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center flex-col ">
            <p className="text-3xl font-semibold">Enter your twilio credentails</p>
            <form
                onSubmit={handleSubmit}
                className="border-2 border-blue-600 rounded-[10px] p-6 max-w-[1200px] flex flex-col gap-10 my-[50px]"
            >
                <input
                    placeholder="Enter Twilio SID"
                    type="text"
                    className="outline-none border p-3 w-[400px]"
                    value={twilioSid}
                    onChange={(e) => setTwilioSid(e.target.value)}
                />
                <input
                    placeholder="Enter Twilio Token"
                    type="password"
                    className="outline-none border p-3 w-[400px]"
                    value={twilioToken}
                    onChange={(e) => setTwilioToken(e.target.value)}
                />
                <input
                    placeholder="Enter Twilio Number"
                    type="text"
                    className="outline-none border p-3 w-[400px]"
                    value={twilioNumber}
                    onChange={(e) => setTwilioNumber(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-600  text-white py-2 px-6 rounded-md text-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TwilioCredentials;
