import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userData } = useAppContext();

    useEffect(() => {
        if (!userData) {
            navigate('/signup');
        }
    }, [pathname]);

    return (
        <>
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
