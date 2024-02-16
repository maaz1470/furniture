import React, { useState } from "react";
import Comming_Soon from "./../../../assets/images/auth/coming-soon-object1.png";
import Comming_Soon2 from "./../../../assets/images/auth/coming-soon-object2.png";
import Comming_Soon3 from "./../../../assets/images/auth/coming-soon-object3.png";
import BG_Gradient from "./../../../assets/images/auth/bg-gradient.png";
import Polygon from "./../../../assets/images/auth/polygon-object.svg";
import { Link } from "react-router-dom";
import { AdminURL } from "../../../hook/useAdminUrl";
import axios from "axios";

const ResetPassword = () => {
    const [processing, setProcessing] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        setProcessing(true)

        const form = e.target;
        const email = form.email.value;

        axios.post(`/api/auth/reset/send-reset-link`,{email}).then(response => {
            console.log(response)
            setProcessing(false)
        }).catch(error => {
            setProcessing(false)
        })

    };
    return (
        <div>
            <div className="fixed bottom-6 right-6 z-50" x-data="scrollToTop">
                <template x-if="showTopButton">
                    <button
                        type="button"
                        className="btn btn-outline-primary animate-pulse rounded-full p-2"
                    >
                        <svg
                            width="24"
                            height="24"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.5"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z"
                                fill="currentColor"
                            />
                            <path
                                d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </template>
            </div>

            <div className="main-container min-h-screen text-black dark:text-white-dark">
                <div x-data="auth">
                    <div className="absolute inset-0">
                        <img
                            src={BG_Gradient}
                            alt="image"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="relative flex min-h-screen items-center justify-center bg-[url(../images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                        <img
                            src={Comming_Soon}
                            alt="image"
                            className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
                        />
                        <img
                            src={Comming_Soon2}
                            alt="image"
                            className="absolute left-24 top-0 h-40 md:left-[30%]"
                        />
                        <img
                            src={Comming_Soon3}
                            alt="image"
                            className="absolute right-0 top-0 h-[300px]"
                        />
                        <img
                            src={Polygon}
                            alt="image"
                            className="absolute bottom-0 end-[28%]"
                        />
                        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                            <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                                <div className="mx-auto w-full max-w-[440px]">
                                    <div className="mb-7">
                                        <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">
                                            Password Reset
                                        </h1>
                                        <p>
                                            Enter your email to recover your Password
                                        </p>
                                    </div>
                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="Email">Email</label>
                                            <div className="relative text-white-dark">
                                                <input
                                                    id="Email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Email"
                                                    className="form-input pl-10 placeholder:text-white-dark"
                                                />
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                            disabled={processing}
                                        >
                                            RECOVER
                                        </button>
                                    </form>
                                    {/* <p><Link to={'/auth/register'}>Register</Link></p> */}
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
