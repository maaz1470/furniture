import React, { useState } from "react";
import Image from "./../../assets/images/product/product-1.jpg";
import axios from "axios";
const AddCategory = () => {
    const [processImage, setProcessImage] = useState(null);

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
        const form = e.target;
        const name = form.name.value;
        const status = form.status.value;
        
        const data = new FormData();
        data.append("name", name);
        data.append("status", status);
        data.append("image", processImage);
        axios.post(`/api/category/store`, data).then((response) => {
            console.log(response);
        });
    };

    return (
        <div>
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
                                Add Category
                            </h5>
                        </div>
                        <div className="mb-5">
                            <form
                                className="space-y-5"
                                onSubmit={handleSubmit}
                                encType="multipart/data"
                            >
                                <div>
                                    <input
                                        name="name"
                                        type="text"
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
                                            src={Image}
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

                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6"
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

export default AddCategory;
