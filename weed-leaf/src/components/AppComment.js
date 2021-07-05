import { Link } from 'react-router-dom'
import { determineTimePosted } from '../helpers/generalHelper'


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
    
    return (
        <div className="comment-actions">
            <div className="comment-action">
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
        user,
        message,
        dateCreated,
        dateUpdated,
    } = props

    return (
        <div className="comment-content">
            <CommentProfileInfo 
                user={user}
                dateCreated={dateCreated}
                dateUpdated={dateUpdated}
            />
            <CommentMessage
                message={message}
            />
            <CommentActions />
        </div>
    )
}

export const AppComment = (props) => {

    const comment = props.comment;

    return (
        <div className="app-comment">
            <CommentProfileImage />
            <CommentContent 
                user={comment.user}
                message={comment.content}
                dateCreated={comment.dateCreated}
                dateUpdated={comment.dateUpdated}
            /> 
        </div>
    )
}
