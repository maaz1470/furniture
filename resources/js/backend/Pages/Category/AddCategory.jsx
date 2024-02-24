import React from "react";
import Image from './../../assets/images/product/product-1.jpg'
const AddCategory = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const status = form.status.value;

        console.log(name, status)
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : Image
        const preview_image = document.getElementById('preview_image')
        preview_image.src = image
    }
    return (
        <div>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <a
                            href="#"
                            className="text-primary hover:underline"
                        >
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
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Category Name"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <input type="file" name="image" onChange={handleImageChange} className="form-input" />
                                </div>
                                <div>
                                    <div className="border rounded-md p-6 w-max">
                                        <img id="preview_image" width="300" src={Image} alt="" />
                                    </div>
                                </div>
                                <div>
                                    <select name="status" id="" className="form-input">
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
