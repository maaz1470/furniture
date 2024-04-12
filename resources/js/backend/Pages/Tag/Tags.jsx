import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AdminURL, AppURL } from "../../hook/useAdminUrl";
import withProgress from "../../HOC/withProgress";
import axios from "axios";
import Loading from "../../shared/Loading/Loading";
import swal from "sweetalert";

const Tag = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("/api/category/all").then((response) => {
            console.log(response);
            setLoading(false);
            if (response.data.status === 200) {
                setCategories(response.data.categories);
            }
        });
    }, []);

    const handleDelete = (e, id) => {
        swal({
            title: "Delete",
            text: "Are you sure want to delete?",
            icon: "warning",
            buttons: ['Cancel', 'Delete']
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`/api/category/deleteCategory/${id}`)
                    .then((response) => {
                        if (response.data.status === 200) {
                            swal("Success", response.data.message, "success");
                            const remainingData = categories.filter(
                                (el) => el.id != id
                            );
                            setCategories(remainingData);
                        } else {
                            swal("Error", response.data.message, "error");
                        }
                    });
            }
        });
    };
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <Helmet>
                <title>All Tags</title>
            </Helmet>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse mb-5">
                    <li>
                        <a href="#" className="text-primary hover:underline">
                            Tags
                        </a>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-1 rtl:before:ml-1">
                        <span>All</span>
                    </li>
                </ul>
                <div>
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                All Tags
                            </h5>
                            <Link
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                                to={`${AdminURL}/tag/add`}
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Add Tag
                                </button>
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Photo</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((el, index) => {
                                            let count = index;
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {++count}
                                                    </td>
                                                    <td className="text-center">
                                                        {el.name}
                                                    </td>
                                                    <td className="text-center flex justify-center">
                                                        {el.image ? (
                                                            <img
                                                                src={`${AppURL}/storage/category/${el.image}`}
                                                                width={200}
                                                                alt=""
                                                            />
                                                        ) : (
                                                            "No Image Found"
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {el.status == 1
                                                            ? "Published"
                                                            : "Unpublished"}
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="flex items-center justify-center gap-4">
                                                            <Link
                                                                to={`${AdminURL}/category/edit/${el.id}`}
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={(e) =>
                                                                    handleDelete(
                                                                        e,
                                                                        el.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default withProgress(Tag);
