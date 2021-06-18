import { useHistory } from "react-router-dom"
import { AppTextEditor } from "../../components/AppTextEditor"
import AppCard from "../../components/AppCard"
import { AppForm } from "../../components/AppForm"
import { useDispatch } from "react-redux"
import { createPost } from "./postsSlice"

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

    const formData = {
        "brandId": {
            'type': 'hidden',
            'value': brandId,
        },
        "productUrlId": {
            'type': 'hidden',
            'value': productUrl,
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
