import { AppCard } from "./AppCard"
import { AppTextEditor } from "./AppTextEditor";
import { AppComment } from "./AppComment";
import { useDispatch } from "react-redux";
import { createComment } from "../pages/comments/commentsSlice";
import { addToPostCommentCount } from "../pages/posts/postsSlice";
import { useState } from "react";

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
    const dispatch = useDispatch()
    const [replyBox, setReplyBox] = useState({commentId: null})

    const {
        postId,
        comments
    } = props

    const handleShowCommentBox = (commentId) => {
        let reply = {...replyBox}
        reply.commentId = reply.commentId === commentId? null : commentId
        setReplyBox(reply)
    }

    const handleSubmitReply = (e, commentId) => {
        e.preventDefault()
        let textEditor = document.getElementById(commentId);
        const postParams = {
            postId: postId,
            commentId: commentId,
            content: textEditor.innerText
        }
        dispatch(createComment(postParams))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                textEditor.innerText = ""
                dispatch(addToPostCommentCount({postId: postId}))
                setReplyBox({commentId: null})
            }
        })
    }

    const renderComments = () => {
        comments.sort(function(a,b){
            return  new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        });

        return comments.map(c => {
            let showReplyBox = c.commentId === replyBox.commentId? true : false
            return<AppComment 
                key={c.commentId}
                handleSubmitReply={handleSubmitReply}
                handleShowCommentBox={handleShowCommentBox}
                replyBoxId={replyBox.commentId}
                showReplyBox={showReplyBox}
                comment={c}
            />
        })
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
        let textEditor = document.getElementById(postId);
        const postParams = {
            postId: postId,
            content: textEditor.innerText
        }
        dispatch(createComment(postParams))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                textEditor.innerText = ""
                dispatch(addToPostCommentCount({postId: postId}))
            }
        })
    }

    return (
        <div className="app-comment-create">
            <form method="POST" onSubmit={(e) => handleSubmitComment(e)}>
                <div className="comment-create-content">
                    <AppTextEditor 
                        editId={postId}
                        name="comment"
                        placeHolder="Add a comment"
                    />
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
                    postId={postId}
                    comments={comments}
                />
            </div>
            
        </AppCard>
    )
}
