import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../shared/Loading/Loading';
import { AdminURL } from '../hook/useAdminUrl';

const AuthLayout = () => {
    const {loading, user} = useContext(AuthContext)
    const navigate = useNavigate();
    if(loading){
        return <Loading />
    }
    if(user){
        return <Navigate to={`${AdminURL}/dashboard`} />
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;