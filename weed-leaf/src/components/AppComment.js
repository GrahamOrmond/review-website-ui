import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { determineTimePosted } from '../helpers/generalHelper'
import { AppCommentEditor } from './AppTextEditor'


const CommentProfileImage = (props) => {

    return (
        <div className="comment-profile">
            <div className="profile-image">
            </div>
        </div>
    )
}

const CommentProfileInfo = (props) => {

    const {
        user,
        dateCreated,
        dateUpdated
    } = props
    
    return (
        <div className="comment-profile">
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
    } = props

    return (
        <div className="comment-actions">
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

const CommentContent = (props) => {

    const {
        comment,
        handleShowCommentBox,
        showReplyBox,
        handleSubmitReply,
    } = props

    let replyContent;
    if(showReplyBox){
        replyContent = <CommentReply 
            handleSubmitReply={handleSubmitReply}
            postId={comment.postId}
            commentId={comment.commentId}
        />
    }

    return (
        <div className="comment-content">
            <CommentProfileInfo 
                user={comment.user}
                dateCreated={comment.dateCreated}
                dateUpdated={comment.dateUpdated}
            />
            <CommentMessage
                message={comment.content}
            />
            <CommentActions 
                handleShowCommentBox={handleShowCommentBox}
            />
            {replyContent}
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

    const {
        comment,
        handleShowCommentBox,
        showReplyBox,
        handleSubmitReply,
    } = props;

    return (
        <div className="app-comment">
            <CommentProfileImage />
            <CommentContent 
                comment={comment}
                showReplyBox={showReplyBox}
                handleShowCommentBox={() => handleShowCommentBox(comment.commentId)}
                handleSubmitReply={handleSubmitReply}
            /> 
        </div>
    )
}
