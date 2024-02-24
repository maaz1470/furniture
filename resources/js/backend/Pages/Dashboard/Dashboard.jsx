import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
// import from './../'
import swal from "sweetalert";
import { toast } from "react-toastify";
import withProgress from "../../HOC/withProgress.jsx";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {

    const handleChange = () => {
        console.log('Something')
    }
    // const [showTopButton, setShowTopButton] = useState(true);
    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div x-data="finance">
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li className="before:mr-1 rtl:before:ml-1">
                        <span>Dashboard</span>
                    </li>
                </ul>
                <div className="pt-5">
                    <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                        <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold mr-1 rtl:ml-1">
                                    Users Visit
                                </div>
                                <div x-data="dropdown">
                                    <a href="#">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-70 hover:opacity-80"
                                        >
                                            <circle
                                                cx="5"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                opacity="0.5"
                                                cx="12"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                cx="19"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </a>
                                    <ul
                                        x-cloak="true"
                                        x-show="open"
                                        x-transition="true"
                                        className="text-black right-0 rtl:left-0 dark:text-white-dark"
                                    >
                                        <li>
                                            <a href="#">View Report</a>
                                        </li>
                                        <li>
                                            <a href="#">Edit Report</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold mr-3 rtl:ml-3">
                                    $170.46
                                </div>
                                <div className="badge bg-white/30">+ 2.35%</div>
                            </div>
                            <div className="mt-5 flex items-center font-semibold">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 shrink-0 mr-2 rtl:ml-2"
                                >
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                    <path
                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                </svg>
                                Last Week 44,700
                            </div>
                        </div>

                        <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold mr-1 rtl:ml-1">
                                    Sessions
                                </div>
                                <div x-data="dropdown">
                                    <a href="#">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-70 hover:opacity-80"
                                        >
                                            <circle
                                                cx="5"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                opacity="0.5"
                                                cx="12"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                cx="19"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </a>
                                    <ul
                                        x-cloak="true"
                                        x-show="open"
                                        x-transition="true"
                                        className="text-black right-0 rtl:left-0 dark:text-white-dark"
                                    >
                                        <li>
                                            <a href="#">View Report</a>
                                        </li>
                                        <li>
                                            <a href="#">Edit Report</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold mr-3 rtl:ml-3">
                                    74,137
                                </div>
                                <div className="badge bg-white/30">- 2.35%</div>
                            </div>
                            <div className="mt-5 flex items-center font-semibold">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 shrink-0 mr-2 rtl:ml-2"
                                >
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                    <path
                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                </svg>
                                Last Week 84,709
                            </div>
                        </div>

                        <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold mr-1 rtl:ml-1">
                                    Time On-Site
                                </div>
                                <div x-data="dropdown">
                                    <a href="#">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-70 hover:opacity-80"
                                        >
                                            <circle
                                                cx="5"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                opacity="0.5"
                                                cx="12"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                cx="19"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </a>
                                    <ul
                                        x-cloak="true"
                                        x-show="open"
                                        x-transition="true"
                                        className="text-black right-0 rtl:left-0 dark:text-white-dark"
                                    >
                                        <li>
                                            <a href="#">View Report</a>
                                        </li>
                                        <li>
                                            <a href="#">Edit Report</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold mr-3 rtl:ml-3">
                                    38,085
                                </div>
                                <div className="badge bg-white/30">+ 1.35%</div>
                            </div>
                            <div className="mt-5 flex items-center font-semibold">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 shrink-0 mr-2 rtl:ml-2"
                                >
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                    <path
                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                </svg>
                                Last Week 37,894
                            </div>
                        </div>

                        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                            <div className="flex justify-between">
                                <div className="text-md font-semibold mr-1 rtl:ml-1">
                                    Bounce Rate
                                </div>
                                <div x-data="dropdown">
                                    <a href="#">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-70 hover:opacity-80"
                                        >
                                            <circle
                                                cx="5"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                opacity="0.5"
                                                cx="12"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle
                                                cx="19"
                                                cy="12"
                                                r="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </a>
                                    <ul
                                        x-cloak="true"
                                        x-show="open"
                                        x-transition="true"
                                        className="text-black right-0 rtl:left-0 dark:text-white-dark"
                                    >
                                        <li>
                                            <a href="#">View Report</a>
                                        </li>
                                        <li>
                                            <a href="#">Edit Report</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="text-3xl font-bold mr-3 rtl:ml-3">
                                    49.10%
                                </div>
                                <div className="badge bg-white/30">- 0.35%</div>
                            </div>
                            <div className="mt-5 flex items-center font-semibold">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 shrink-0 mr-2 rtl:ml-2"
                                >
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                    <path
                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></path>
                                </svg>
                                Last Week 50.01%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withProgress(Dashboard);
