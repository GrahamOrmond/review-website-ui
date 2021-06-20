import { useHistory } from "react-router-dom"
import { AppTextEditor } from "../../components/AppTextEditor"
import AppCard from "../../components/AppCard"
import { AppForm } from "../../components/AppForm"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "./postsSlice"
import { selectAllBrands } from "../brands/brandsSlice"
import { client } from "../../api/client"

const sortList = (list) => {
    let sortedList = [...list];
    sortedList.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });
    return sortedList;
}

const generateBrandOptions = (brandsList) => {
    let brandSorted = sortList(brandsList)
    return brandSorted.map(brand => {
        return {
            id: brand.brandId,
            label: brand.name
        }
    })
};

const generateProductOptions = (productsList) => {
    let productsSorted = sortList(productsList)
    return productsSorted.map(product => {
        return {
            id: product.urlId,
            label: product.name
        }
    })
};

const getBrandProducts = async (brandId) => {
    const response = await client.get('/api/products?brandId=' + brandId)
    return response;
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

    productOptions.forEach(option => {
        let optionDom = document.createElement("option");
        optionDom.id = option.id;
        optionDom.text = option.label;
        productSelectBox.add(optionDom);
    });
}


export const SubmitPostPage = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {
        location,
        brandId,
        productUrl,
    } = props.match.params
    const type = props.match.params.postType
    const postType = type? type.toLowerCase() : "review"  
    
    if(!location)
        history.push("/community/submit")

    let baseUrl = `/${location}`
    if(brandId)
        baseUrl += `/${brandId}`
    if(productUrl)
        baseUrl += `/${productUrl}`

    const handleSubmitPost = (postParams) => {
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
            history.push(`/products/${brandId}/submit/${postType}`)
        }
    }

    const brandsList = useSelector(selectAllBrands)
    let formData = {
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
        "type": {
            'label': 'Post Type',
            'type': 'select',
            'options': [
                {
                    id: "review",
                    label: "Review"
                },
                {
                    id: "question",
                    label: "Question"
                },
                {
                    id: "thread",
                    label: "Thread"
                }
            ],
            'placeholder': '',
            'required': true,
            'value': postType,
            handleOnChange: handleReviewTypeChange
        },
        "status": {
            'label': 'Post Status',
            'type': 'select',
            'options': [
                {
                    id: "public",
                    label: "Public"
                },
                {
                    id: "private",
                    label: "Private"
                },
            ],
            'placeholder': '',
            'required': true,
            'value': 'public',
        },
        "title": {
            'label': 'Title',
            'type': 'text',
            'placeholder': '',
            'required': true,
            'value': ''
        }
        
    }

    const content = {
        'label': 'Post',
        'type': 'textEditor',
        'placeholder': '',
        'required': true,
        'value': 'textEditor'
    }

    const postParams = {
        
    }
    for (const [key, value] of Object.entries(postParams)) {
        formData[key] = value
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
