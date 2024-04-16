import React, { useEffect, useState } from "react";
import Image from "./../../assets/images/product/product-1.jpg";
import axios from "axios";
import withProgress from "../../HOC/withProgress";
import { AdminURL } from "../../hook/useAdminUrl";
import Seo from "../../Component/Seo/Seo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";
const EditTag = () => {
    const [tag, setTag] = useState({})
    const [keywords, setKeywords] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true)

    const handleChange = (tag) => {
        setKeywords(tag);
    };

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`${AdminURL}/tag/edit/${id}`);

        axios.get(`/api/tag/edit/${id}`).then(response => {
            setLoading(false)
            if(response.data.status === 200){
                setTag(response.data.tag)
            }else if(response.data.status === 404){
                swal('Error',response.data.message,'error')
                navigate(`${AdminURL}/tag`,{
                    replace: true
                })
            }else{
                swal('Error','Something went wrong. Please try again.','error')
            }
        })
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const form = e.target;
        const name = form.name.value;
        const meta_title = form.meta_title.value;
        const meta_description = form.meta_description.value;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("meta_title", meta_title);
        formData.append("meta_description", meta_description);
        formData.append("keywords", keywords);
        axios
            .post(`/api/tag/store`, formData)
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
                    setKeywords([])
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

    if(loading){
        return <Loading />
    }

    return (
        <div>
            <ToastContainer />
            <Helmet>
                <title>Add Tag</title>
            </Helmet>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <a href="#" className="text-primary hover:underline">
                            Tags
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
                                Add Tag
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
                                        defaultValue={tag.name}
                                        type="text"
                                        placeholder="Tag Name"
                                        className="form-input"
                                    />
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

export default withProgress(EditTag);
