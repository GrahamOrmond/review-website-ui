import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitPost } from "./SubmitPost";

export const PostsPage = (props) => {

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

    return (
        <SubmitPost
            baseUrl={baseUrl}
            productUrl={productUrl}
            brandId={brandId}
            postType={postType}
            
            
            />
    )
}