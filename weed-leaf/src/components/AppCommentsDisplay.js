import { AppCard } from "./AppCard"
import { AppCommentEditor } from "./AppTextEditor";
import { AppComment } from "./AppComment";
import { useDispatch } from "react-redux";
import { createComment } from "../pages/comments/commentsSlice";

export const AppCommentListFilter = (props) => {

    return (
        <div className="comments-filter">
            {/* <div className="comment-filter-header">
                <h4>Comments</h4>
            </div> */}
            <div className="comment-filter-options">
                <div className="comment-filter-option">
                    <label>Sort By</label>
                    <select>
                        <option>New</option>
                        <option>Top Rated</option>
                    </select>
                </div>
            </div>
        </div>
    )
}


export const AppCommentList = (props) => {

    const {
        comments
    } = props

    const renderComments = () => {
        return comments.map(c => <AppComment comment={c}/>)
    }

    return (
        <div className="">
            <AppCommentListFilter />
            <div className="content-seperator">
            </div>
            { renderComments() }
        </div>
    )
}


export const AppCommentCreate = (props) => {

    const dispatch = useDispatch()

    const {
        postId
    } = props


    const handleSubmitComment = (event) => {
        event.preventDefault()
        let textEditor = document.getElementById("edit_content");
        const postParams = {
            postId: postId,
            content: textEditor.innerText
        }
        dispatch(createComment(postParams))
        .then(res => {
            if(res.meta.requestStatus == "fulfilled"){
                textEditor.innerText = ""
            }
        })
    }

    return (
        <div className="app-comment-create">
            <form method="POST" onSubmit={(e) => handleSubmitComment(e)}>
                <div className="comment-create-content">
                    <AppCommentEditor />
                </div>
                <div className="comment-create-toolbar">
                    <div className="comment-create-buttons">
                        <button type="submit" className="button button-blue comment-button">
                            Comment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export const AppCommentsDisplay = (props) => {

    const {
        postId,
        comments
    } = props


    return (
        <AppCard>
            <div className="app-comment-display">
                <AppCommentCreate 
                    postId={postId}
                />
                <AppCommentList 
                    comments={comments}
                />
            </div>
            
        </AppCard>
    )
}
