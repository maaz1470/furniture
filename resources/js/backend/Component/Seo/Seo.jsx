import React from "react";
import { TagsInput } from "react-tag-input-component";
const Seo = ({value, change, ...rest}) => {
    
    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    SEO
                </h5>
            </div>

            <div className="mb-3">
                <TagsInput value={value} onChange={change} placeHolder="Keywords" name="keywords" />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    name="meta_title"
                    className="form-input"
                    placeholder="Meta Title"
                    defaultValue={rest?.data.meta_title}
                />
            </div>
            <div className="mb-3">
                <textarea
                    name="meta_description"
                    className="form-input"
                    placeholder="Meta Description"
                    cols="30"
                    rows="10"
                    defaultValue={rest?.data.meta_description}
                ></textarea>
            </div>
        </div>
    );
};

export default Seo;
