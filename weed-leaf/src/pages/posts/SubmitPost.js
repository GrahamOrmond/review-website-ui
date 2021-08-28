import React, { useEffect, useState } from 'react';
import { AppCard } from "../../components/AppCard"
import { AppDynamicSelect, AppFileInput, AppInput, AppMultiSelect, AppSelect } from "../../components/AppForm"
import { postOptions } from './submitPostOptions';
import { AppMarkupEditor } from '../../components/AppTextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from './postsSlice';
import { useHistory } from 'react-router-dom';
import { sortListByName } from '../../helpers/generalHelper'
import { fetchBrands, getBrandsListInfo } from '../brands/brandsSlice'
import { fetchProducts, getProductsByBrandId, getProductSearchParams } from '../products/productsSlice'

// handle submitting posts
export const SubmitPostForm = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    
    const {
        postId,
        brandId,
        productUrl,
        postType,
        mediaFiles,
        title,
        content,
    } = props // get urls params to declare default values

    // delare form data with default values (grows as data is inputted into form)
    const [formData, setFormData] = useState({
        "type": postType,
        "status": "private",
        "brandId": brandId,
        "productUrlId": productUrl,
        "oldFiles": mediaFiles,
        "files": [],
        "title": title,
        "content": content,
        "productEffects": []
    })

    // load brand and product options
    const brandsListInfo = useSelector(getBrandsListInfo) // get all brands
    const brandsList = brandsListInfo.items
    const productList = useSelector(s => getProductsByBrandId(s, formData.brandId)) // get products by brand
    const existingParams = useSelector(s => getProductSearchParams(s, {'brandId': formData.brandId})); // get search params
    useEffect(() => {
        if(!existingParams){ // if user has not search for these products before
            dispatch(fetchProducts({'brandId': formData.brandId})) // get products by brand
        }

        if(brandsListInfo.status === "idle"){ // brands have not been loaded
            dispatch(fetchBrands({})) // load all brands
        }
    }, [existingParams, formData, brandsListInfo, dispatch])

    // generate list of brand options
    const generateBrandOptions = () => {
        let brandSorted = sortListByName(brandsList, "name")
        let options = {
            '': {
                'label': '-- Select --'
            }
        }
        brandSorted.forEach(brand => {
            options[brand.brandId] = {
                label: brand.name
            }
        });
        return options
    };

    // generate list of product options
    const generateProductOptions = () => {
        let productSorted = sortListByName(productList, "name")
        let options = {
            '': {
                'label': '-- Select --'
            }
        }
        productSorted.forEach(product => {
            options[product.urlId] = {
                label: product.name
            }
        });
        return options
    };

    // handle select box change
    const handleSelectChange = (e) => {
        let newState = {...formData}
        const selectedOption = e.target.options[e.target.selectedIndex].id
        newState[e.target.name] = selectedOption
        if(newState['brandId'] !== formData.brandId) // brand changed
            delete newState['productUrlId'] // remove selected product

        setFormData(newState) // set form data
        handleHistoryChange(newState) // change url
    }

    // handle multiple select options change
    // used to update state when multiple select options are used for product effects
    const handleMultiSelectChange = (option) => {
        let newState = {...formData}

        // check for existing instance=
        let index = newState.productEffects.findIndex(s => s === option)
        if(index !== -1){ // instance found
            newState.productEffects.splice(index,1) // remove option from list
        }else{ // hasnt been added
            newState.productEffects.push(option) // add option to list
        }

        setFormData(newState) // set form data
    }

    // handle history change
    const handleHistoryChange = (newState) => {
        // return if form matches url
        if(newState.type === postType 
            && newState.brandId === brandId
            && newState.productUrlId === productUrl
            || postId){ // edit post
                return
        }

        // change url-
        if(newState.productUrlId){ // product selected
            history.push(`/products/${newState.brandId}/${newState.productUrlId}/submit/${newState.type}`)
        }else if (newState.brandId) { // brand selected
            history.push(`/brands/${newState.brandId}/submit/${newState.type}`)
        }else { // no brand selected
            history.push(`/community/submit/${newState.type}`)
        }
    }

    // handle input box change
    const handleInputChange = (e) => {
        let newState = {...formData}
        newState[e.target.name] = e.target.value
        setFormData(newState)
    }

    // handle file input box change
    const handleFileChange = (file, removeFile = false) => {
        // copy state
        let newState = {...formData};
        let oldFiles = [...formData.oldFiles]
        let newFiles = [...formData.files]

        // determine new state
        if(removeFile){ // remove file from list
            
            const index = oldFiles.indexOf(file); // find index of old file
            if(index !== -1){ // index found
                oldFiles.splice(index, 1);  // remove file
            }else{ // old file not found
                const index = newFiles.indexOf(file); // find new file index
                newFiles.splice(index, 1); // remove file
            }
            
        }else{ // add file to list
            newFiles.push(file)
        }

        // set state
        newState.oldFiles = oldFiles
        newState.files = newFiles
        setFormData(newState)
    }

    // returns post data from the form
    const getPostData = () => {
        // get post params from data
        const postDto = ["type", "status", "content", "title", 
            "productUrlId", "brandId", "productEffects", 
            "rating", "oldFiles", "files"];
        let postData = { // post data with list delaired by default
            properties: [],
            files: [],
        }
        for (const [key, param] of Object.entries(formData)) {
            if(postDto.includes(key)){ // post data
                postData[key] = param
            }else{ // post property data
                postData.properties.push({ 
                    'property': key,
                    'value': param
                })
            }
        }
        
        postData.content = document.getElementById("content").innerText;
        return postData;
    }

    // determins url to return to after posting
    const determineBaseUrl = (brandId, productUrlId) => {
        if(productUrlId){
            return `/products/${brandId}/${productUrlId}`
        }else if (brandId){
            return `/brands/${brandId}`
        }else {
            return '/community'
        }
    }

    // handle submitting post
    const handleSubmitPost = () => {
        const postData = getPostData() // get post data from the form
        // submit the post
        dispatch(createPost(postData))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled")
                history.push(determineBaseUrl(postData.brandId, postData.productUrlId))
        })
    }

    // handle saving post draft
    const handleSavePost = () => {
        let postData = getPostData() // get post data from the form
        postData.status = "Draft" // set status to draft for easy acces
        // save the draft
        dispatch(createPost(postData))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled")
            history.push(determineBaseUrl(postData.brandId, postData.productUrlId))
        })
    }

    // handle saving post draft
    const handleUpdatePost = () => {
        let postData = getPostData() // get post data from the form
        // update the post
        dispatch(updatePost({...postData, ...{'postId': postId}}, ))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled")
            history.push(determineBaseUrl(postData.brandId, postData.productUrlId))
        })
    }

    // add review inputs to the form
    let reviewContent;
    if(formData.type === "review" && formData.productUrlId){ // type review and product selected
        
        const effectOptions = [
            {
                "id": "feelings",
                'label': "Feelings",
                'options': postOptions.effects.feelings
            },
            {
                "id": "negatives",
                'label': "Negatives",
                'options': postOptions.effects.negatives
            },
            {
                "id": "smell",
                'label': "Smell",
                'options': postOptions.effects.smell
            },
            {
                "id": "helps",
                'label': "Helps With",
                'options': postOptions.effects.helps
            },
        ]
        
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
            <div>
                <AppMultiSelect 
                    label="Effects"
                    handleMultiSelectChange={handleMultiSelectChange}
                    data={effectOptions}
                    selectedOptions={formData.productEffects}
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
                            options={generateBrandOptions()}
                            handleOnChange={handleSelectChange}
                        />
                        <AppSelect 
                            name="productUrlId"
                            label="Product"
                            selectedValue={formData.productUrlId}
                            options={generateProductOptions()}
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
                            oldFiles={formData.oldFiles}
                            newFiles={formData.files}
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

                {
                    postId?
                        <div className="form-footer">
                            <button type="submit" 
                                className="button-blue" 
                                onClick={handleUpdatePost}>
                                Save Changes
                            </button>
                        </div>
                        :
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
                }

               
            </AppCard>
        </div>
    )
}