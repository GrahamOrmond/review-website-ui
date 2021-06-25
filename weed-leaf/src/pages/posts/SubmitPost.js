import React, { useRef, useState } from 'react';
import { useHistory } from "react-router-dom"
import AppCard from "../../components/AppCard"
import { AppForm } from "../../components/AppForm"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "./postsSlice"
import { getBrandProducts, selectAllBrands } from "../brands/brandsSlice"
import { sortListByName } from "../../helpers/generalHelper"
import { postProperties } from "./PostProperties"

const generateBrandOptions = (brandsList) => {
    let brandSorted = sortListByName(brandsList, "name")
    let options = {}
    brandSorted.forEach(brand => {
        options[brand.brandId] = {
            label: brand.name
        }
    });
    return options
};

const generateProductOptions = (productsList) => {
    let productsSorted = sortListByName(productsList, "name")
    let options = {}
    productsSorted.forEach(product => {
        options[product.urlId] = {
            label: product.name
        }
    });
    return options
};

const renderProductOptions = async (brandId) => {
    const productsInfo = await getBrandProducts(brandId)
    let productOptions = generateProductOptions(productsInfo.products);

    let productSelectBox = document.getElementById("post-form")
        .elements["productUrlId"];
    for(let i = productSelectBox.options.length; i >= 0; i--) {
        productSelectBox.remove(i);
    }

    let selectOption = document.createElement("option");
    selectOption.text = '-- Select --';
    productSelectBox.add(selectOption);

    for (const [key, option] of Object.entries(productOptions)) {
        let optionDom = document.createElement("option");
        optionDom.id = key;
        optionDom.text = option.label;
        productSelectBox.add(optionDom);
    }
}

const determineBaseUrl = (brandId, productUrlId) => {

    if(productUrlId){
        return `/products/${brandId}/${productUrlId}`
    }else if (brandId){
        return `/brands/${brandId}`
    }else {
        return '/community'
    }
}

export const SubmitPost = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const {
        brandId,
        productUrl,
        postType,
    } = props

    const updateFormData = (newState) => {
        const type = newState.type.value
        if(type != "review"){
            newState['rating'].type = "hidden"
            newState['properties'] = "hidden"
        }else{
            newState['rating'].type = "select"
            newState['properties'] = "properties"
            for (const [key, value] of Object.entries(postProperties())) {
                newState[key] = value
            }
        }
        setFormData(newState)
    }

    
    const handleSubmitPost = (postParams) => {
        const postDto = ["content", "title", "type", 
        "status", "productUrlId", "brandId", "rating"];
        let properties = [] 
        let effects = [] 
        for (const [key, param] of Object.entries(postParams)) {
            if(!postDto.includes(key)){
                properties.push({
                    'property': key,
                    'value': param
                })
                delete postParams[key]
            }
        }
        postParams.ProductProperties = properties
        postParams.ProductEffects = []
        dispatch(createPost(postParams))
        .then(res => {
            if(res.meta.requestStatus == "fulfilled")
                history.push(determineBaseUrl(postParams.brandId, postParams.productUrlId))
        })
    }

    const handleSavePost = (postParams) => {
        postParams.Status = "Draft"
        dispatch(createPost(postParams))
        .then(res => {
            if(res.meta.requestStatus == "fulfilled")
            history.push(determineBaseUrl(postParams.brandId, postParams.productUrlId))
        })
    }

    const handleReviewTypeChange = (formData, selectedOption) => {
        const brand = formData.brandId.value
        const product = formData.productUrlId.value
        history.push(`${determineBaseUrl(brand, product)}/submit/${selectedOption}`)
    }

    const handleBrandChange = async (formData, selectedOption) => {
        const selectedType = formData.type.value
        history.push(`/brands/${selectedOption}/submit/${selectedType}`)
        await renderProductOptions(selectedOption);
    }

    const handleProductChange = (formData, selectedOption) => {
        const selectedBrand = formData.brandId.value
        const selectedType = formData.type.value

        if(selectedOption){
            history.push(`/products/${selectedBrand}/${selectedOption}/submit/${selectedType}`)
        }else{
            history.push(`/brands/${selectedBrand}/submit/${selectedType}`)
        }
    }

    const brandsList = useSelector(selectAllBrands)
    let formDataTemplate = {
        "type": {
            'label': 'Post Type',
            'type': 'select',
            'options': {
                "review": {
                    'label': "Review"
                },
                "question": {
                    'label': "Question"
                },
                "thread": {
                    'label': "Thread"
                },
            },
            'placeholder': '',
            'required': true,
            'value': postType,
            handleOnChange: handleReviewTypeChange
        },
        "status": {
            'label': 'Post Status',
            'type': 'select',
            'options': {
                'public': {
                    'label': "Public"
                },
                'private': {
                    'label': "Private"
                }
            },
            'placeholder': '',
            'required': true,
            'value': 'public',
        },
        "brandId": {
            'label': 'Brand',
            'type': 'select',
            'options': generateBrandOptions(brandsList),
            'placeholder': '',
            'value': brandId,
            handleOnChange: handleBrandChange
        },
        "productUrlId": {
            'label': 'Brand',
            'type': 'select',
            'options': [],
            'placeholder': '',
            'value': productUrl,
            handleOnChange: handleProductChange
        },
        "title": {
            'label': 'Title',
            'type': 'text',
            'placeholder': '',
            'required': true,
            'value': ''
        }
        
    }
    
    if(postType == "review"){
        for (const [key, value] of Object.entries(postProperties())) {
            formDataTemplate[key] = value
        }
    }
    
    const content = {
        'label': 'Post',
        'type': 'textEditor',
        'placeholder': '',
        'required': true,
        'value': 'textEditor'
    }
    formDataTemplate.content = content
    const submitButtons = {
        "save": {
            label: "Save Draft",
            handleSubmit: handleSavePost
        },
        "post": {
            label: "Post",
            handleSubmit: handleSubmitPost
        }
    }
    const [ formData, setFormData ] = useState(formDataTemplate)

    return (
        <div className="app-content">
            <AppCard >
                <AppForm 
                    id="post-form"
                    title="Create Post"
                    submitTitle="Create Post"
                    method="POST"
                    formData={formData}
                    submitButtons={submitButtons}
                    updateFormData={updateFormData}
                />
            </AppCard>
            
        </div>
    )
}