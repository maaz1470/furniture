import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { AdminURL } from '../hook/useAdminUrl';
import Loading from '../shared/Loading/Loading';
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            await axios.get(`/api/admin/checkAdmin`).then(response => {
                setLoading(false)
                if(response.data.status === 200){
                    setUser(response.data.authorization)
                }else{
                    setUser(false)
                }
            }).catch(() => {

                setLoading(false)
                setUser(false)

                // console.clear()
            

            })
        }
        checkUser();
    },[])


    const info = {
        loading,
        user
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