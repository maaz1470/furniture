import axios from "axios";
import nProgress from "nprogress";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const withProgress = (WrappedComponent, axiosInstance) => {
    console.log('with progress')
    const withProgress = (props) => {
      useEffect(() => {
        const request = axios.interceptors.request.use(config => {
            nProgress.start();
            return config;
        },(error) => {
            nProgress.done();
            return Promise.reject(error)
        })

        const response = axios.interceptors.response.use(response => {
            nProgress.done();
        }, (error) => {
            nProgress.done();
            return Promise.reject(error)
        })

      }, []);
  
      return <WrappedComponent {...props} />;
    };
  
    return withProgress;
  };
  
  export default withProgress;