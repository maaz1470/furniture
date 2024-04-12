import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AdminURL, AppURL } from "../../hook/useAdminUrl";
import withProgress from "../../HOC/withProgress";
import axios from "axios";
import Loading from "../../shared/Loading/Loading";
import swal from "sweetalert";

const SubSubCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("/api/sub-sub-category/all").then((response) => {
            setLoading(false);
            if (response.data.status === 200) {
                setCategories(response.data.categories);
            }
        });
    }, []);
    const handleDelete = (e, id) => {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`/api/sub-sub-category/delete/${id}`).then(response => {
                        if(response.data.status === 200){
                            swal('Success',response.data.message,'success')
                        }else if(response.data.status === 404){
                            swal('Error',response.data.message,'error')
                        }
                        const remaingData = categories.filter(category => category.id != id)
                        setCategories(remaingData)
                    })
                }
            });
    }
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <Helmet>
                <title>All Sub Categories</title>
            </Helmet>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse mb-5">
                    <li>
                        <a href="#" className="text-primary hover:underline">
                            Sub Sub Categories
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
                                All Sub Categories
                            </h5>
                            <Link
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                                to={`${AdminURL}/sub-sub-category/add`}
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
                                            <th>Photo</th>
                                            <th>Parent Category</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((el, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {el.name}
                                                    </td>
                                                    <td className="text-center flex justify-center">
                                                        {el.image ? <img src={`${AppURL}/storage/sub-sub-category/${el.image}`} width={200} alt="" /> : 'No Image Found'}
                                                    </td>
                                                    <td className="text-center">
                                                        {el.parent_categories.name}
                                                    </td>
                                                    <td className="text-center">
                                                        {el.status == 1 ? 'Published' : 'Unpublished'}
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="flex items-center justify-center gap-4">
                                                            <Link
                                                                to={`${AdminURL}/sub-sub-category/edit/${el.id}`}
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={(e) => handleDelete(e, el.id)}
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
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

export default withProgress(SubSubCategory);
