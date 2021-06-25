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

    return (
        <SubmitPost
            productUrl={productUrl}
            brandId={brandId}
            postType={postType}
            />
    )
}