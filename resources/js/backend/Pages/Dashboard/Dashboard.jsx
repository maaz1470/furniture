import React, { useEffect } from 'react';
import withProgress from '../../HOC/withProgress';
import axios from 'axios';
import { AdminURL } from '../../hook/useAdminUrl';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default withProgress(Dashboard);