import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppCommentsDisplay } from "../../components/AppCommentsDisplay"
import { AppPost }  from "../../components/AppPost"
import { fetchComments, selectPostComments } from "../comments/commentsSlice"
import { clearPostView, fetchPost, selectPostView } from "./postsSlice"


export const PostDisplay = (props) => {
    const dispatch = useDispatch()

    let postDisplay = useSelector(selectPostView);
    let post = postDisplay.post
    let postComments = useSelector(state => selectPostComments(state, post));
    
    useEffect(() => {
        if (post !== null) { // post loaded
            if(post.urlId.toLowerCase() === props.fetchData.urlId.toLowerCase()
                && post.brand.brandId.toLowerCase() === props.fetchData.brandId.toLowerCase()
                && post.product.urlId.toLowerCase() == props.fetchData.productUrlId.toLowerCase()
                && post.displayName.toLowerCase() === props.fetchData.displayName.toLowerCase()) // matches
            {
                // load comments
                if(postComments.length == 0){
                    dispatch(fetchComments({postId: post.postId}))
                }
                return
            }
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
        <div className="post-display">
            <AppPost 
                display="full"
                post={post}>
            </AppPost>
            <AppCommentsDisplay 
                postId={post.postId}
                comments={postComments}
            />
        </div>
        
    )

}
