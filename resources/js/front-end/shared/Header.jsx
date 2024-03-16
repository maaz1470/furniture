import React from "react";
import logo from '../assets/images/logo/logo.svg'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="">
            <div className="container mx-auto py-4 flex items-center justify-between">
                <div className="leftside flex items-center gap-5">
                    <Link to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">
                        help center
                    </Link>
                    <Link className="hover:text-primary hover:underline">
                        Sell on Takealot
                    </Link>
                </div>
                <div className="rightside flex items-center gap-5">
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">
                        login
                    </Link>
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">
                        register
                    </Link>
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">
                        order
                    </Link>
                    <div className="dropdown relative">
                        <div className="dropdown-toggle cursor-pointer hover:text-primary hover:underline">
                            My account
                        </div>
                        <div className="dropdown-menu hidden absolute bg-white min-w-max  shadow-lg z-10">
                            <div className="px-4 py-2 lg:w-[200px] hover:bg-gray-100 cursor-pointer">
                                My Account
                            </div>
                            <div className="px-4 py-2 lg:w-[200px] hover:bg-gray-100 cursor-pointer">
                                Track Order
                            </div>
                            <div className="px-4 py-2 lg:w-[200px] hover:bg-gray-100 cursor-pointer">
                                Return
                            </div>
                            <div className="px-4 py-2 lg:w-[200px] hover:bg-gray-100 cursor-pointer">
                                Invoice
                            </div>
                        </div>
                    </div>
                    <div className="hover:text-primary hover:underline">
                        wishlist
                    </div>
                    <div className="hover:text-primary hover:underline">
                        cart
                    </div>
                </div>
            </div>

            <div className="header-nav bg-blue-600">Header nav</div>
        </header>
    );
}
