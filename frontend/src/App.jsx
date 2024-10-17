import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import MakeCall from './pages/MakeCall';
import Layout from './pages/Layout';
import TwilioCredentials from './pages/TwilioCredentials';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/protected" element={<ProtectedRoute />}>
                        <Route path="make-call" element={<MakeCall />} />
                        <Route path="twilio-credentials" element={<TwilioCredentials />} />
                    </Route>
                </Route>
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </>
    );
}
