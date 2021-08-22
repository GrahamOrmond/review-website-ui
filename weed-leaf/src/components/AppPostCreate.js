import { useHistory } from "react-router-dom"
import { AppCard } from "./AppCard"

export const AppPostCreate = (props) =>
{
    const {
        urlBase
    } = props

    const history = useHistory()

    const loadPostForm = () => {
        history.push(urlBase + "submit")
    }

    return (
        <AppCard >
            <div className="app-post-create">
                <div className="post-create-header">
                    <h3>Create Post</h3>
                </div>
                <div className="post-create-content">
                    <div className="post-create" onClick={loadPostForm} onChange={loadPostForm}>
                        <input type="textarea" placeholder="Whats on your mind?"/>       
                    </div>
                </div>
            </div>
        </AppCard>
    )
}
