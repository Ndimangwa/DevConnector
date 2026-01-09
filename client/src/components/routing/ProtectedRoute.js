import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Spinner from '../layouts/Spinner';

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useSelector((state) => state.auth);
    
    return loading ? <Spinner/> : isAuthenticated ? <Outlet/> : <Navigate to='/login' replace/>
}

export default ProtectedRoute;