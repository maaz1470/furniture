import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { AdminURL } from '../hook/useAdminUrl';
import Loading from '../shared/Loading/Loading';

const ProtectedRoutes = ({children}) => {
    const {loading,user} = useContext(AuthContext)
    // console.log(user)
    if(loading){
        return <Loading />
    }
    
    if(!user){
        return <Navigate to={`${AdminURL}/auth/login`} />
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoutes;