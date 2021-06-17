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
        </div>
    );
}
export default AppThreadDisplay;
