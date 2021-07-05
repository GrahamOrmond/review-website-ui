import { AppCard } from "./AppCard"
import { AppCommentEditor } from "./AppTextEditor";
import { AppComment } from "./AppComment";

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

    const comments = [ {
        user: {
            displayName: "gmoney99s"
        },
        content: "test message"
    }]

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

    return (
        <div className="app-comment-create">
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
        </div>
    )
}


export const AppCommentsDisplay = (props) => {

    return (
        <AppCard>
            <div className="app-comment-display">
                <AppCommentCreate />
                <AppCommentList />
            </div>
            
        </AppCard>
    )
}
