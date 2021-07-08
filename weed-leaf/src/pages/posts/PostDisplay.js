import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppCommentsDisplay } from "../../components/AppCommentsDisplay"
import { AppPost }  from "../../components/AppPost"
import { fetchComments, selectPostComments } from "../comments/commentsSlice"
import { clearPostView, fetchPost, selectPostView } from "./postsSlice"


export const PostDisplay = (props) => {
    const dispatch = useDispatch()

    const {
        fetchData
    } = props

    let postDisplay = useSelector(selectPostView);
    let post = postDisplay.post
    let postComments = useSelector(state => selectPostComments(state, post));
    useEffect(() => {
        if (post !== null) { // post loaded
            if(post.urlId.toLowerCase() === fetchData.urlId.toLowerCase()
                && post.brand.brandId.toLowerCase() === fetchData.brandId.toLowerCase()
                && post.product.urlId.toLowerCase() === fetchData.productUrlId.toLowerCase()
                && post.displayName.toLowerCase() === fetchData.displayName.toLowerCase()) // matches
            {
                // load comments
                if(postComments.length < post.commentCount){
                    dispatch(fetchComments({postId: post.postId}))
                }
                return
            }
            dispatch(clearPostView()) // clear post if not matching
        }
        if(postDisplay.status !== 'loading'){
             dispatch(fetchPost(fetchData)) // fetch post by params 
        }
    }, [post, postDisplay, postComments, fetchData, dispatch])

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
