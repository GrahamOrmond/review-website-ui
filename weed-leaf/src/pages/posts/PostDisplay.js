import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppCommentsDisplay } from "../../components/AppCommentsDisplay"
import { AppPost }  from "../../components/AppPost"
import { fetchComments, getCommentsByPost, getCommentsSearchParams } from "../comments/commentsSlice"
import { getCurrentUser } from "../oauth/oauthSlice"
import { clearPostView, fetchPost, getPostById, getPostView, setPostView } from "./postsSlice"
import { SubmitPostForm } from "./SubmitPost"


export const PostDisplay = (props) => {
    const dispatch = useDispatch()

    const {
        displayName,
        urlId,
        action,
    } = props

    const view = useSelector(getPostView);
    const post = useSelector(s => getPostById(s, displayName, urlId));
    const existingParam = useSelector(s => getCommentsSearchParams(s, {
        postId: post?.postId,
    }))
    const comments = useSelector(s => getCommentsByPost(s, post))
    const currentUser = useSelector(s => getCurrentUser(s))
    useEffect(() => {
        if(view.status === 'idle'){ // view not loaded
            if(!post){ // no post found
                dispatch(fetchPost({
                    displayName: displayName,
                    urlId: urlId
                }))
                return
            }
            // post already loaded and found
            dispatch(setPostView({ 
                displayName: post.displayName,
                urlId: post.urlId 
            }))
            return
        }

        // view doesnt match post
        if(view.displayName.toLowerCase() !== displayName.toLowerCase()
            && view.urlId.toLowerCase() !== urlId.toLowerCase()){
            dispatch(clearPostView())
            return
        }

        // fetch comments of post loaded and params not searched before
        if(post && !existingParam){
            dispatch(fetchComments({
                postId: post.postId,
            }))
        }
    }, [view, post, displayName, urlId, existingParam,  dispatch])

    if(!post) return (<div></div>)

    if(action == "edit"){
        return <SubmitPostForm
            postId={post.postId}
            productUrl={post.product.urlId}
            brandId={post.brand.brandId}
            postType={post.type}
            mediaFiles={post.mediaFiles}
            title={post.title}
            content={post.content}
        />
    }

    return (
        <div className="post-display">
            <AppPost 
                display="full"
                post={post}
                canEdit={currentUser && currentUser.profileId === post.profileId}>
            </AppPost>
            <AppCommentsDisplay 
                postId={post.postId}
                comments={comments}
                currentUser={currentUser}
            />
        </div>
        
    )

}
