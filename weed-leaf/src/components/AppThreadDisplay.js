import AppFilter from './AppFilter';
import AppPost from './AppPost';

const AppThreadDisplay = (props) => {

    const renderPosts = (posts) => {
        let postsList = []
        posts.forEach(post => {
            postsList.push(<AppPost post={post} />);
        });
        return postsList;
    }
    
    let content = ""
    if(props.reviews != null && props.reviews.posts != null){
        content = renderPosts(props.reviews.posts)
    }

    return (
        <div>
            <AppFilter />
            {content}
        </div>
    );
}
export default AppThreadDisplay;
