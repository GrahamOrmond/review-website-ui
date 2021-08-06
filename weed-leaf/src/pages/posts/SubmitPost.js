import React, { useState } from 'react';
import { AppCard } from "../../components/AppCard"
import { AppDynamicSelect, AppFileInput, AppInput, AppSelect } from "../../components/AppForm"
import { postOptions } from './submitPostOptions';
import { AppMarkupEditor } from '../../components/AppTextEditor';

// handle submitting posts
export const SubmitPostForm = (props) => {

    const {
        brandId,
        // productUrl,
        postType,
    } = props // get urls params to declare default values

    // delare form data with default values (grows as data is inputted into form)
    const [formData, setFormData] = useState({
        "type": postType,
        "status": "private",
        "brandId": brandId
    })

    // handle select box change
    const handleSelectChange = (e) => {
        let newState = {...formData}
        const selectedOption = e.target.options[e.target.selectedIndex].id
        newState[e.target.name] = selectedOption
        setFormData(newState)
    }

    // handle input box change
    const handleInputChange = (e) => {
        let newState = {...formData}
        newState[e.target.name] = e.target.value
        setFormData(newState)
    }

    // handle file input box change
    const handleFileChange = (fileList, file, removeFile = false) => {
        let newState = {...formData};
        if(removeFile){
            const fileIndex = newState[fileList].files.indexOf(file);
            newState[fileList].files.splice(fileIndex, 1);
        }else{
            newState[fileList].files.push(file)
        }
        setFormData(newState)
    }

    // handle submitting post
    const handleSubmitPost = () => {
        console.log(formData)
    }

    // handle saving post draft
    const handleSavePost = () => {
        console.log(formData)
    }

    // add review inputs to the form
    let reviewContent;
    if(formData.type === "review"){
        reviewContent = [
            <div className="form-input-group">
                <AppSelect 
                    name="rating"
                    label="Rating"
                    selectedValue={formData.rating}
                    options={postOptions.rating}
                    handleOnChange={handleSelectChange}
                />
            </div>,
            <div className="form-input-group">
                <AppDynamicSelect
                    label="Properties"
                    options={postOptions.properties}
                />
            </div>,
        ]
    }

    return (
        <div className="app-content">
            <AppCard>
                <div className="form-header">
                    <h4>Create Post</h4>
                </div>

                <div className="form-content">

                    <div className="form-input-group">
                        <AppSelect 
                            name="type"
                            label="Type"
                            selectedValue={formData.type}
                            options={postOptions.type}
                            handleOnChange={handleSelectChange}
                        />
                        <AppSelect 
                            name="status"
                            label="Status"
                            selectedValue={formData.status}
                            options={postOptions.status}
                            handleOnChange={handleSelectChange}
                        />
                    </div>

                    <div className="form-input-group">
                        <AppSelect 
                            name="brandId"
                            label="Brand"
                            selectedValue={formData.brandId}
                            options={postOptions.brands}
                            handleOnChange={handleSelectChange}
                        />
                        <AppSelect 
                            name="productId"
                            label="Product"
                            selectedValue={formData.productId}
                            options={postOptions.products}
                            handleOnChange={handleSelectChange}
                        />
                    </div>

                    <div className="form-input-group">
                        <AppInput 
                            name="title"
                            label="Title" 
                            type="text"
                            placeholder=''
                            value={formData.title}
                            handleChange={handleInputChange}
                        />
                    </div>

                    <div className="form-input-group">
                        <AppFileInput
                            name="mediaFiles" 
                            label="Media"
                            handleOnChange={handleFileChange}
                            files={formData.files}
                        />
                    </div>

                    { reviewContent }

                    <div className="form-input-group">
                        <AppMarkupEditor 
                            name="content"
                            editId="content"
                            label=""
                            placeholder="Whats on your mind?"
                            value={formData.content}
                        />
                    </div>
 
                </div>

                <div className="form-footer">
                    <button type="submit" 
                        className="button-blue" 
                        onClick={handleSavePost}>
                        Save Draft
                    </button>
                    <button type="submit" 
                        className="button-blue" 
                        onClick={handleSubmitPost}>
                        Post
                    </button>
                </div>
            </AppCard>
        </div>
    )
}