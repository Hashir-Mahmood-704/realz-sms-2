import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const AdminProtectedRoute = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userData } = useAppContext();

    useEffect(() => {
        if (userData.role !== 'admin') {
            navigate('/');
        }
    }, [pathname]);
    return (
        <>
            <Outlet />
        </>
    );
};

export default AdminProtectedRoute;
