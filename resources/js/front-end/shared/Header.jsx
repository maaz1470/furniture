import React from "react";
import logo from "../../../../public/assets/images/frontent/logo/logo.svg";
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
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">login</Link>
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">register</Link>
                    <Link className="lg:border-r lg:pr-4 hover:text-primary hover:underline">order</Link>
                    <div>my account</div>
                    <div>wishlist</div>
                    <div>cart</div>
                </div>
            </div>

            <div className="header-nav bg-blue-600">Header nav</div>
        </header>
    );
}
