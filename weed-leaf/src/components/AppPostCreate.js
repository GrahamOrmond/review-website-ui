import { useHistory } from "react-router-dom"
import AppCard from "./AppCard"

export const AppPostCreate = (props) =>
{
    const history = useHistory()

    const loadPostForm = () => {
        history.push(props.urlBase + "submit")
    }

    return (
        <AppCard >
            <div className="app-post-create">
                <div className="post-create-header">
                    {/* <div className="header-title">
                        Create Post
                    </div> */}
                </div>
                <div className="post-create-content">
                    <div className="post-create" onClick={loadPostForm} onChange={loadPostForm}>
                        <input type="textarea" placeholder="Write whats on your mind"/>       
                    </div>
                </div>
            </div>
        </AppCard>
    )
}