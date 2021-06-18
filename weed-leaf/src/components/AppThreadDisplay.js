import AppFilter from './AppFilter';
import AppPost from './AppPost';
import { AppPostCreate } from './AppPostCreate';

const AppThreadDisplay = (props) => {

    const renderPosts = () => {
        return props.posts.map(post => (
            <AppPost post={post} />
        ))
    }

    let content = ""
    if(props.posts != null){
        content = renderPosts()
    }

    let progress = "End Of Content";
    
    return (
        <div>
            <AppPostCreate
                urlBase={props.urlBase}
            />
            <AppFilter
                postType={props.postType}
                urlBase={props.urlBase}
            />
            {content}
            <div className="thread-end">
                <h3>{progress}</h3>
            </div>
        </div>
    );
}
export default AppThreadDisplay;
