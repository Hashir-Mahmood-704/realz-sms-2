import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { userData } = useAppContext();
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
                {/* Welcome Message */}
                <h1 className="text-blue-600 text-4xl font-bold mb-4">
                    Welcome to the Communication Platform
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Easily make calls through our platform using Twilio integration.
                </p>

                {userData ? (
                    <div className="bg-blue-600 text-white py-2 px-6 rounded-md text-lg">
                        {userData.role === 'admin' ? (
                            <Link to="/protected/admin-protected/dashboard">Dashboard</Link>
                        ) : (
                            <Link to="/protected/make-call">Make Call</Link>
                        )}
                    </div>
                ) : (
                    <Link to='/signup' className="bg-blue-600  text-white py-2 px-6 rounded-md text-lg">
                        You need to sign in first
                    </Link>
                )}
            </div>
        </>
    );
};

export default HomePage;
