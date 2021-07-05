import { Link } from 'react-router-dom'


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
        user
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
                        21 hours ago
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

const CommmentMessage = (props) => {

    const {
        message
    } = props

    return (
        <div className="comment-body">
            <p>{message}</p>
        </div>
    )
}

const CommmentContent = (props) => {

    const {
        user,
        message,
    } = props

    return (
        <div className="comment-content">
            <CommentProfileInfo 
                user={user}
            />
            <CommmentMessage
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
            <CommmentContent 
                user={comment.user}
                message={comment.content}
            /> 
        </div>
    )
}
