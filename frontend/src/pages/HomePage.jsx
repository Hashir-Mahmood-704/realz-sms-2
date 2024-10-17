import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { userData } = useAppContext();
    return (
        <>
            <div className="flex flex-col items-center justify-center h-96">
                {/* Welcome Message */}
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    Welcome to the Communication Platform
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Easily make calls through our platform using Twilio integration.
                </p>

                {userData ? (
                    <div className="bg-gradient-to-r from-orange-500 to-pink-600  text-white py-2 px-6 rounded-md text-lg">
                        {userData.role === 'admin' ? (
                            <Link to="/protected/admin-protected/dashboard">Dashboard</Link>
                        ) : (
                            <Link to="/protected/make-call">Make Call</Link>
                        )}
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-orange-500 to-pink-600  text-white py-2 px-6 rounded-md text-lg">
                        You need to sign in first
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;
