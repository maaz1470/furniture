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
const EditSubCategory = () => {
    const [processImage, setProcessImage] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(true)

    const handleChange = (tag) => {
        setKeywords(tag);
    };

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get('/api/category/parent-category').then(response => {
            console.log(response)
            if (response.data.status === 200) {
                setCategories(response.data.categories)
            }
        })
        axios.get(`/api/sub-category/sub-edit/${id}`).then(response => {
            if (response.data.status === 200) {
                if (response.data.category.keywords) {
                    const keywords = response.data.category.keywords.split(',')
                    setKeywords(keywords)
                }
                setCategory(response.data.category)
                
            }else if(response.data.status === 404){
                navigate(`${AdminURL}/sub-category`)
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
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
        const sub_category = form.sub_category.value;
        const url = form.slug.value;

        const formData = new FormData();
        formData.append('id',id)
        formData.append("name", name);
        formData.append("status", status);
        formData.append("parent_category", sub_category);
        formData.append("meta_title", meta_title);
        formData.append("meta_description", meta_description);
        formData.append("image", processImage);
        formData.append("keywords", keywords);
        formData.append('slug',url)
        axios
            .post(`/api/sub-category/update`, formData)
            .then((response) => {
                console.log(response)
                if (response.data.status === 401) {
                    response.data.errors.forEach((el) =>
                        toast.error(el, {
                            position: "top-right",
                        })
                    );
                } else if (response.data.status === 200) {
                    swal("Success", response.data.message, "success");
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

    if(loading){
        return <Loading />
    }

    return (
        <div>
            <ToastContainer />
            <Helmet>
                <title>Add Sub Category</title>
            </Helmet>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <a href="#" className="text-primary hover:underline">
                            Sub Category
                        </a>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-1 rtl:before:ml-1">
                        <span>Add</span>
                    </li>
                </ul>
                <div className="pt-5">
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                Add Sub Category
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
                                    placeholder="Category Name"
                                    className="form-input"
                                    defaultValue={category.name}
                                />
                            </div>
                                <div>
                                    <input
                                        name="slug"
                                        type="text"
                                        placeholder="Category Slug"
                                        className="form-input"
                                        defaultValue={category.slug}
                                    />
                                </div>
                                <div>
                                    <select name="sub_category" defaultValue={category.parent_id} className="form-input">
                                        {
                                            categories.map((el, index) => {
                                                return <option key={index} value={el.id}>{el.name}</option>
                                            })
                                        }
                                    </select>
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
                                            src={category.image ? `${AppURL}/storage/sub-category/${category.image}` : Image}
                                            alt=""
                                        />
                                    </div>
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

                                <Seo value={keywords} change={handleChange} data={category} />

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

export default withProgress(EditSubCategory);
