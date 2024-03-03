import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AdminURL } from "../../hook/useAdminUrl";
import withProgress from "../../HOC/withProgress";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // axios.get(`${AdminURL}/category`)
        axios.get('/api/category/all').then(response => {
            console.log(response)
        })
    },[])
    return (
        <div>
            <Helmet>
                <title>All Categories</title>
            </Helmet>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse mb-5">
                    <li>
                        <a href="#" className="text-primary hover:underline">
                            Forms
                        </a>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-1 rtl:before:ml-1">
                        <span>Layouts</span>
                    </li>
                </ul>
                <div>
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                All Categories
                            </h5>
                            <Link
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                                to={`${AdminURL}/category/add`}
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Add Category
                                </button>
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                Name
                                            </td>
                                            <td className="text-center">
                                                Sonar Bangla
                                            </td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withProgress(Category);
