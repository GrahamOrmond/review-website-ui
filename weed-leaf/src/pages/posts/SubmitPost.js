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
    console.log(productsList)
    let productsSorted = sortListByName(productsList, "name")
    let options = {}
    console.log(productsSorted)
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


export const SubmitPost = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const {
        baseUrl,
        brandId,
        productUrl,
        postType,
    } = props

    const handleSubmitPost = (postParams) => {
        console.log(postParams)
        dispatch(createPost(postParams))
        .then(res => {
            if(res.meta.requestStatus == "fulfilled")
                history.push(baseUrl)
        })
    }

    const handleSavePost = (postParams) => {
        postParams.Status = "Draft"
        dispatch(createPost(postParams))
        .then(res => {
            if(res.meta.requestStatus == "fulfilled")
                history.push(baseUrl)
        })
    }

    const handleReviewTypeChange = (element) => {
        const selectedOption = element.options[element.selectedIndex].id
        history.push(`${baseUrl}/submit/${selectedOption}`)
    }

    const handleBrandChange = async (element) => {
        const selectedOption = element.options[element.selectedIndex].id
        history.push(`/brands/${selectedOption}/submit/${postType}`)
        await renderProductOptions(selectedOption);
    }

    const handleProductChange = (element) => {
        const selectedOption = element.options[element.selectedIndex].id
        if(selectedOption){
            history.push(`/products/${brandId}/${selectedOption}/submit/${postType}`)
        }else{
            history.push(`/brands/${brandId}/submit/${postType}`)
        }
    }

    const brandsList = useSelector(selectAllBrands)
    let formData = {
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
            formData[key] = value
        }
    }
    
    const content = {
        'label': 'Post',
        'type': 'textEditor',
        'placeholder': '',
        'required': true,
        'value': 'textEditor'
    }
    formData.content = content

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
                />
            </AppCard>
            
        </div>
    )
}
