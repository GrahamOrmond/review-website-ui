import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { determineTimePosted } from '../helpers/generalHelper'
import { fetchComments, rateComment, selectCommentReplies } from '../pages/comments/commentsSlice'
import { AppCommentEditor } from './AppTextEditor'
import AppButton from './AppButton'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

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
        dateUpdated
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

const CommentActions = (props) => {
    
    const {
        handleShowCommentBox,
        handleRatingUp,
        handleRatingDown,
        rating
    } = props

    return (
        <div className="comment-actions">
            <div class="comment-rating">
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
            <div className="comment-action" onClick={handleShowCommentBox} >
                Reply
            </div>
            <div className="comment-action">
                Report
            </div>
        </div>
    )
}

const CommentMessage = (props) => {

    const {
        message
    } = props

    return (
        <div className="comment-body">
            <p>{message}</p>
        </div>
    )
}

const CommentRepliesList = (props) => {
    const dispatch = useDispatch()
    const {
        commentId,
        count,
        handleShowCommentBox,
        replyBoxId,
        handleSubmitReply,
    } = props

    const loadCommentReplies = (count) => {
        dispatch(fetchComments({ replyCommentId: commentId }))
    }

    const replies = useSelector(state => selectCommentReplies(state, commentId))
    const commentsLength = replies.length;
    let replyActions;
    if(commentsLength == 0){
        replyActions = (
            <div className="reply-actions">
                <div className="reply-action" onClick={() => loadCommentReplies()}>
                    View Replies ({count})
                </div>
            </div>
        )
    }else if (commentsLength < count){
        replyActions = (
            <div className="reply-actions">
                <div className="reply-action" onClick={() => loadCommentReplies()}>
                    Load More ({count - commentsLength})
                </div>
            </div>
        )
    }

    const renderReplyComments = () => {
        return replies.map(c => {
            
            let showReplyBox = c.commentId === replyBoxId? true : false
            return <AppComment 
                key={c.commentId}
                handleSubmitReply={handleSubmitReply}
                handleShowCommentBox={handleShowCommentBox}
                replyBoxId={replyBoxId}
                showReplyBox={showReplyBox}
                comment={c}
            />
        })
    }

    return (
        <div className="comment-replies-list">
            {replyActions}
            {renderReplyComments()}
        </div>
    )
}

const CommentContent = (props) => {

    const {
        comment,
        handleShowCommentBox,
        showReplyBox,
        replyBoxId,
        handleSubmitReply,
        handleRatingUp,
        handleRatingDown,
    } = props

    

    let replyContent;
    if(showReplyBox){
        replyContent = <CommentReply 
            handleSubmitReply={handleSubmitReply}
            postId={comment.postId}
            commentId={comment.commentId}
        />
    }

    let replyComments;
    if(comment.replyCount > 0){
        replyComments = <CommentRepliesList
            commentId={comment.commentId}
            count={comment.replyCount}
            handleShowCommentBox={handleShowCommentBox}
            showReplyBox={showReplyBox}
            handleSubmitReply={handleSubmitReply}
            replyBoxId={replyBoxId}
        />
    }
    
    const rating = comment.upCount - comment.downCount
    return (
        <div className="comment-content">
            <CommentMessage
                message={comment.content}
            />
            <CommentActions 
                rating={rating}
                handleRatingDown={handleRatingDown}
                handleRatingUp={handleRatingUp}
                handleShowCommentBox={() => handleShowCommentBox(comment.commentId)}
            />
            {replyContent}
            {replyComments}
        </div>
    )
}

export const CommentReply = (props) => {
    
    const {
        commentId,
        postId,
        handleSubmitReply,
    } = props
    
    return (
        <div className="app-comment-create">
            <form method="POST" onSubmit={(e) => handleSubmitReply(e, commentId)}>
                <div className="comment-create-content">
                    <AppCommentEditor 
                        editId={commentId}
                        placeHolder="Add a Reply"
                    />
                </div>
                <div className="comment-create-toolbar">
                    <div className="comment-create-buttons">
                        <button type="submit" className="button button-blue comment-button">
                            Reply
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export const AppComment = (props) => {

    const dispatch = useDispatch()
    const {
        comment,
        handleShowCommentBox,
        showReplyBox,
        handleSubmitReply,
        replyBoxId,
    } = props;

    const handleRatingUp = (e) => {
        e.preventDefault();
        let formData = {
            referenceId: comment.commentId,
            rating: "UP"
        }
        dispatch(rateComment(formData))
    }

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
            <CommentProfile 
                user={comment.user}
                dateCreated={comment.dateCreated}
                dateUpdated={comment.dateUpdated}
            />
            <CommentContent 
                comment={comment}
                showReplyBox={showReplyBox}
                replyBoxId={replyBoxId}
                handleShowCommentBox={handleShowCommentBox}
                handleSubmitReply={handleSubmitReply}
                handleRatingDown={handleRatingDown}
                handleRatingUp={handleRatingUp}
            /> 
        </div>
    )
}
