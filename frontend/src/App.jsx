import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
// import MakeCall from './pages/MakeCall';
import Layout from './pages/Layout';
// import TwilioCredentials from './pages/TwilioCredentials';
import ProtectedRoute from './pages/ProtectedRoute';
import AdminProtectedRoute from './pages/AdminProtectedRoute';
import Dashboard from './pages/Dashboard';
import UserCallDetails from './pages/UserCallDetails';
import CampaignPage from './pages/CampaignPage';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/protected" element={<ProtectedRoute />}>
                        {/* <Route path="make-call" element={<MakeCall />} /> */}
                        <Route path="campaign-call" element={<CampaignPage />} />
                        {/* <Route path="twilio-credentials" element={<TwilioCredentials />} /> */}
                        <Route path="admin-protected" element={<AdminProtectedRoute />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="user-call-details/:userId" element={<UserCallDetails />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </>
    );
}
