import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AppCard from "../../components/AppCard"
import AppPost from "../../components/AppPost"
import { clearPostView, fetchPost, selectPostView } from "./postsSlice"


export const PostDisplay = (props) => {

    const dispatch = useDispatch()

    let postDisplay = useSelector(selectPostView);
    let post = postDisplay.post

    useEffect(() => {
        if (post !== null) { // post loaded
            if(post.urlId.toLowerCase() === props.fetchData.urlId.toLowerCase()
                && post.brand.brandId.toLowerCase() === props.fetchData.brandId.toLowerCase()
                && post.product.urlId.toLowerCase() == props.fetchData.productUrlId.toLowerCase()
                && post.displayName.toLowerCase() === props.fetchData.displayName.toLowerCase()) // matches
                return;
            dispatch(clearPostView()) // clear post if not matching
        }
        
        dispatch(fetchPost(props.fetchData)) // fetch post by params 
    }, [post, dispatch])

    if(post == null){
        return (
            <div>

            </div>
        )
    }
    return (
        <AppCard>
            <AppPost post={post}>
            </AppPost>
        </AppCard>
    )

}