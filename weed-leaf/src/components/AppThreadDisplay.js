import { useSelector } from 'react-redux';
import { isUserLoggedIn } from '../pages/oauth/oauthSlice';
import { AppPostFilter } from './AppFilter';
import { AppPost } from './AppPost';
import { AppPostCreate } from './AppPostCreate';

const AppThreadDisplay = (props) => {

    const isLoggedIn = useSelector(isUserLoggedIn);

    const renderPosts = () => {
        return props.posts.map(post => (
            <AppPost 
                key={post.postId}
                preview={true}
                post={post} 
            />
        ))
    }

    let content = ""
    if(props.posts != null){
        content = renderPosts()
    }

    let progress = "End Of Content";

    let createContent;
    if(isLoggedIn){
        createContent = (
            <AppPostCreate
                urlBase={props.urlBase}
            />
        )
    }
    
    return (
        <div>
            {createContent}
            <AppPostFilter
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
