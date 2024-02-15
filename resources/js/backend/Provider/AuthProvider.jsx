import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { AdminURL } from '../hook/useAdminUrl';
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            await axios.get(`${AdminURL}/checkAuth`).then(response => {
                console.log(response)
            }).catch(error => {
                // console.clear()
            })
        }
        checkUser();
    },[])


    const info = {
        loading,
    }
    return (
        <div>
            <AuthContext.Provider value={info}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;