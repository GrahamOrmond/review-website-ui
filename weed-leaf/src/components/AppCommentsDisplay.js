import { AppCard } from "./AppCard"
import { AppTextEditor } from "./AppTextEditor";
import { AppComment } from "./AppComment";
import { useDispatch } from "react-redux";
import { createComment, deleteComment, updateComment } from "../pages/comments/commentsSlice";
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
    const [commentBox, setCommentBox] = useState({
        commentId: null,
        action: null
    })

    const {
        postId,
        comments,
        currentUser
    } = props

    // handle showing reply box
    // used to show reply box to comments
    const handleShowCommentBox = (commentId, action) => {
        if(commentBox.commentId === commentId  // matching comment
            && commentBox.action === action){
            setCommentBox({ // remove set state
                commentId: null,
                action: null
            })
            return
        }

        setCommentBox({ // set state
            commentId: commentId,
            action: action
        })
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
                setCommentBox({
                    commentId: null,
                    action: null
                })
            }
        })
    }

    // handles deleting a comment
    // used to send post request to delete a comment by ID
    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId)).then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                setCommentBox({ // remove comment state
                    commentId: null,
                    action: null
                })
            }
        })
    }

    // handles sumbitting comment edit
    // used to send despatch updating comment
    const handleSubmitEdit = (e, commentId) => {
        e.preventDefault()
        let textEditor = document.getElementById(commentId);
        const postParams = {
            commentId: commentId,
            content: textEditor.innerText
        }
        dispatch(updateComment(postParams))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                textEditor.innerText = ""
                setCommentBox({
                    commentId: null,
                    action: null
                })
            }
        })
    }

    
    // sort the comments from latest date posted
    comments.sort(function(a,b){
        return  new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    });

    return (
        <div className="">
            <AppCommentListFilter />
            <div className="content-seperator">
            </div>
            {
                // return list of comments
                comments.map(c => <AppComment 
                    key={c.commentId}
                    handleSubmitReply={handleSubmitReply}
                    handleSubmitEdit={handleSubmitEdit}
                    handleDeleteComment={handleDeleteComment}
                    handleShowCommentBox={handleShowCommentBox}
                    commentBox={commentBox}
                    comment={c}
                    currentProfileId={currentUser?.profileId}
                />)
            }
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
                        value=""
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
        comments,
        currentUser
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
                    currentUser={currentUser}
                />
            </div>
            
        </AppCard>
    )
}
