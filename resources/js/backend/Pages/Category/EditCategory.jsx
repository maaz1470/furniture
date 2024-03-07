import React, { useEffect, useState } from "react";
import Image from "./../../assets/images/product/product-1.jpg";
import axios from "axios";
import withProgress from "../../HOC/withProgress";
import { AdminURL, AppURL } from "../../hook/useAdminUrl";
import Seo from "../../Component/Seo/Seo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";
const EditCategory = () => {
    const [processImage, setProcessImage] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState({});

    const handleChange = (tag) => {
        setKeywords(tag);
    };

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${AdminURL}/category/edit/${id}`);
        axios
            .get(`/api/category/edit/${id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    setCategory(response.data.category);
                } else if (response.data.status === 404) {
                    swal("Error", response.data.message, "error");
                    navigate(`${AdminURL}/category`);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const handleImageChange = (e) => {
        let image;
        const preview_image = document.getElementById("preview_image");
        if (e.target.files[0]) {
            image = URL.createObjectURL(e.target.files[0]);
            preview_image.src = image;
        } else {
            image = Image;
        }
        setProcessImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const form = e.target;
        const name = form.name.value;
        const status = form.status.value;
        const meta_title = form.meta_title.value;
        const meta_description = form.meta_description.value;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("status", status);
        formData.append("meta_title", meta_title);
        formData.append("meta_description", meta_description);
        formData.append("image", processImage);
        formData.append("keywords", keywords);
        axios
            .post(`/api/category/store`, formData)
            .then((response) => {
                console.log(response);
                if (response.data.status === 401) {
                    response.data.errors.forEach((el) =>
                        toast.error(el, {
                            position: "top-right",
                        })
                    );
                } else if (response.data.status === 200) {
                    swal("Success", response.data.message, "success");
                    const preview_image =
                        document.getElementById("preview_image");
                    preview_image.src = Image;
                    setKeywords([]);
                    form.reset();
                } else {
                    swal(
                        "Error",
                        "Something went wrong. Please try again.",
                        "error"
                    );
                }
                setProcessing(false);
            })
            .catch((error) => {
                setProcessing(false);
            });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <ToastContainer />
            <Helmet>
                <title>Edit Category</title>
            </Helmet>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <a href="#" className="text-primary hover:underline">
                            Forms
                        </a>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-1 rtl:before:ml-1">
                        <span>Layouts</span>
                    </li>
                </ul>
                <div className="pt-5">
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                Edit Category
                            </h5>
                        </div>
                        <div className="mb-5">
                            <form
                                className="space-y-5"
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        defaultValue={category.name}
                                        placeholder="Category Name"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <div className="border rounded-md p-6 w-max">
                                        <img
                                            id="preview_image"
                                            width="300"
                                            src={
                                                category.image
                                                    ? `${AppURL}/storage/category/${category.image}`
                                                    : Image
                                            }
                                            alt=""
                                        />
                                    </div>
                                    {category.image && (
                                        <div className="mt-2 ml-2">
                                            <button className="btn btn-danger">
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <select
                                        name="status"
                                        id=""
                                        className="form-input"
                                    >
                                        <option value="1">Published</option>
                                        <option value="0">Unpublished</option>
                                    </select>
                                </div>

                                <br />
                                <br />

                                <Seo value={keywords} change={handleChange} />

                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6"
                                    disabled={processing}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withProgress(EditCategory);
