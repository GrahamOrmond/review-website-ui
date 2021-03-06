import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { determineTimePosted } from '../helpers/generalHelper'
import { fetchComments, rateComment, selectCommentReplies } from '../pages/comments/commentsSlice'
import { AppTextEditor } from './AppTextEditor'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { AppDeleteModal } from './AppModal'

const CommentProfileImage = (props) => {

    return (
        <div className="profile-image">
        </div>
    )
}

const CommentProfile = (props) => {

    const {
        user,
        dateCreated,
        // dateUpdated
    } = props
    
    return (
        <div className="comment-profile">
            <CommentProfileImage />
            <div className="user-info">
                <div>
                    <Link to={`/user/${user.displayName}`}>
                        <h2>
                            {user.displayName}
                        </h2>
                    </Link>
                </div>
                <div>
                    <p>
                        {determineTimePosted(dateCreated)}
                    </p>
                </div>
            </div>
        </div>
    )
}

// comment button actions
// used to handle comment button actions
const CommentActions = (props) => {
    
    const {
        handleShowReply,
        handleShowEdit,
        handleShowDelete,
        handleRatingUp,
        handleRatingDown,
        rating,
        canEdit
    } = props

    return (
        <div className="comment-actions">
            {/* comment ratings */}
            <div className="comment-rating">
                <div className="rate-action" onClick={(e) => handleRatingUp(e)}>
                    <ArrowUpwardIcon />
                </div>
                <div>
                    <p>{rating}</p>
                </div>
                <div className="rate-action" onClick={(e) => handleRatingDown(e)}>
                    <ArrowDownwardIcon />
                </div>
            </div>
            <div className="comment-action" onClick={handleShowReply} >
                Reply
            </div>
            {
                canEdit? // can edit
                    [
                        <div className="comment-action" onClick={handleShowEdit}>
                            Edit
                        </div>,
                        <div className="comment-action" onClick={handleShowDelete}>
                            Delete
                        </div>
                    ]
                : // cant edit comment
                    <div className="comment-action">
                        Report
                    </div>
            }
        </div>
    )
}

// comment message
// used to display the comments message content
const CommentMessage = (props) => {

    const {
        message,
        isDeleted,
    } = props

    if(isDeleted){ // comment was deleted
        return (
            <div className="comment-body comment-deleted">
                <p>message deleted</p>
            </div>
        )
    }

    // return normal 
    return (
        <div className="comment-body">
            <p>
                {message}
            </p>
        </div>
    )
}

// comment reply list
// used to show comment replies
const CommentRepliesList = (props) => {
    const dispatch = useDispatch()
    const {
        commentId,
        commentBox,
        count,
        handleShowCommentBox,
        handleSubmitReply,
        handleSubmitEdit,
        currentProfileId,
    } = props

    // fetch comment replies
    const replies = useSelector(state => selectCommentReplies(state, commentId))
    const commentsLength = replies.length;

    // handle load comment replies
    // used to fetch more comment replies to display
    const loadCommentReplies = () => {
        dispatch(fetchComments({ replyCommentId: commentId }))
    }

    // determine fetch replies button
    let loadAction;
    if(commentsLength === 0){ // no replies loaded yet
        loadAction = (
            <div className="reply-actions">
                <div className="reply-action" onClick={() => loadCommentReplies()}>
                    View Replies ({count})
                </div>
            </div>
        )
    }else if (commentsLength < count){ // load more results
        loadAction = (
            <div className="reply-actions">
                <div className="reply-action" onClick={() => loadCommentReplies()}>
                    Load More ({count - commentsLength})
                </div>
            </div>
        )
    }

    return (
        <div className="comment-replies-list">
            {
                // return list of comments as replies
                replies.map(c => <AppComment 
                    key={c.commentId}
                    handleSubmitReply={handleSubmitReply}
                    handleSubmitEdit={handleSubmitEdit}
                    handleShowCommentBox={handleShowCommentBox}
                    comment={c}
                    commentBox={commentBox}
                    currentProfileId={currentProfileId}
                />)
            }
            {
                // show load action
                loadAction
            }
        </div>
    )
}

// comment content
// used to display the comments content
const CommentContent = (props) => {

    const {
        comment,
        commentBox,
        handleShowCommentBox,
        handleSubmitReply,
        handleSubmitEdit,
        handleDeleteComment,
        handleRatingUp,
        handleRatingDown,
        currentProfileId,
    } = props

    // check if comment is deleted
    if(comment.status === "DELETED"){ // deleted comment
        return ( // return comment without actions
            <div className="comment-content">
                <CommentMessage
                    isDeleted={true}
                />
                {
                // show replies 
                comment.replyCount > 0? // comment has replies
                    <CommentRepliesList
                        commentId={comment.commentId}
                        commentBox={commentBox}
                        count={comment.replyCount}
                        handleShowCommentBox={handleShowCommentBox}
                        handleSubmitReply={handleSubmitReply}
                        handleSubmitEdit={handleSubmitEdit}
                        currentProfileId={currentProfileId}
                    /> : ''
            }
            </div>
        )
    }

    // check active comment box is set to this comment
    const showCommentBox = commentBox.commentId === comment.commentId? true : false
    return (
        <div className="comment-content">
            {
                // comment info
                commentBox.action === "EDIT" && showCommentBox? // comment box active and set to edit
                <CommentBox 
                    handleSubmit={handleSubmitEdit}
                    commentId={comment.commentId}
                    content={comment.content}
                    placeHolder="Edit Message"
                    buttonTitle="Edit"
                />
                : // not set to edit
                <CommentMessage
                    message={comment.content}
                />
            }
                <CommentActions // show comment button actions
                    isActiveEdit={commentBox.isEdit}
                    canEdit={currentProfileId === comment.user.profileId}
                    rating={comment.upCount - comment.downCount}
                    handleRatingDown={handleRatingDown}
                    handleRatingUp={handleRatingUp}
                    handleShowReply={() => handleShowCommentBox(comment.commentId, "REPLY")}
                    handleShowEdit={() => handleShowCommentBox(comment.commentId, "EDIT")}
                    handleShowDelete={() => handleShowCommentBox(comment.commentId, "DELETE")}
                />
            {
                // show reply box
                showCommentBox && commentBox.action === "REPLY"? // reply box enabled
                <CommentBox 
                    handleSubmit={handleSubmitReply}
                    commentId={comment.commentId}
                    placeHolder="Add a Reply"
                    buttonTitle="Reply"
                /> : ''
            }
            {
                // show replies 
                comment.replyCount > 0? // comment has replies
                    <CommentRepliesList
                        commentId={comment.commentId}
                        commentBox={commentBox}
                        count={comment.replyCount}
                        handleShowCommentBox={handleShowCommentBox}
                        handleSubmitReply={handleSubmitReply}
                        handleSubmitEdit={handleSubmitEdit}
                        currentProfileId={currentProfileId}
                    /> : ''
            }
            {
                // show delete modal
                showCommentBox && commentBox.action === "DELETE"?
                <AppDeleteModal 
                    resource="comment"
                    handleCancel={() => handleShowCommentBox(comment.commentId, "DELETE") }
                    handleDeletePost={() => handleDeleteComment(comment.commentId)}
                />
                : ''
            }
        </div>
    )
}


// comment box
// used to submit comments to a post
export const CommentBox = (props) => {
    
    const {
        commentId,
        handleSubmit,
        placeHolder,
        content,
        buttonTitle,
    } = props
    
    return (
        <div className="app-comment-create">
            <form method="POST" onSubmit={(e) => handleSubmit(e, commentId)}>
                <div className="comment-create-content">
                    <AppTextEditor 
                        editId={commentId}
                        name="comment"
                        placeHolder={placeHolder}
                        value={content}
                    />
                </div>
                <div className="comment-create-toolbar">
                    <div className="comment-create-buttons">
                        <button type="submit" className="button button-blue comment-button">
                            {buttonTitle}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


// main app comment thread
export const AppComment = (props) => {

    const dispatch = useDispatch()
    const {
        comment,
        commentBox,
        handleShowCommentBox,
        handleSubmitReply,
        handleSubmitEdit,
        handleDeleteComment,
        currentProfileId
    } = props;

    // handles rating up comments
    // used to add to comment ratings
    const handleRatingUp = (e) => {
        e.preventDefault();
        let formData = {
            referenceId: comment.commentId,
            rating: "UP"
        }
        dispatch(rateComment(formData))
    }

    // handles rating down comments
    // used to reduce comment ratings
    const handleRatingDown = (e) => {
        e.preventDefault();
        let formData = {
            referenceId: comment.commentId,
            rating: "DOWN"
        }
        dispatch(rateComment(formData))
    }

    return (
        <div className="app-comment">
            <CommentProfile // users profile info
                user={comment.user}
                dateCreated={comment.dateCreated}
                dateUpdated={comment.dateUpdated}
            />
            <CommentContent  // comment content
                comment={comment}
                commentBox={commentBox}
                handleShowCommentBox={handleShowCommentBox}
                handleSubmitReply={handleSubmitReply}
                handleSubmitEdit={handleSubmitEdit}
                handleDeleteComment={handleDeleteComment}
                currentProfileId={currentProfileId}
                handleRatingDown={handleRatingDown}
                handleRatingUp={handleRatingUp}
            /> 
        </div>
    )
}
