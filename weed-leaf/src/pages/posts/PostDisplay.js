import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppCommentsDisplay } from "../../components/AppCommentsDisplay"
import { AppPost }  from "../../components/AppPost"
import { clearPostView, fetchPost, getPostById, getPostView, setPostView } from "./postsSlice"


export const PostDisplay = (props) => {
    const dispatch = useDispatch()

    const {
        // brandId,
        // productUrlId,
        // type,
        displayName,
        urlId,
    } = props

    let view = useSelector(getPostView);
    let post = useSelector(state => getPostById(state, displayName, urlId));
    useEffect(() => {
        if(view.status === 'idle'){
            if(!post){ // no post found
                dispatch(fetchPost({
                    displayName: displayName,
                    urlId: urlId
                }))
            }else{
                // post already loaded and found
                dispatch(setPostView({ 
                    displayName: post.displayName,
                    urlId: post.urlId 
                }))
            }
            return
        }

        if(view.displayName.toLowerCase() !== displayName.toLowerCase()
            && view.urlId.toLowerCase() !== urlId.toLowerCase()){
            dispatch(clearPostView())
        }
    }, [view, post, displayName, urlId,  dispatch])

    if(!post) return (<div></div>)
    return (
        <div className="post-display">
            <AppPost 
                display="full"
                post={post}>
            </AppPost>
            <AppCommentsDisplay 
                postId={post.postId}
                comments={[]}
            />
        </div>
        
    )

}
