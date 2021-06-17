import { useSelector } from "react-redux";
import AppThreadDisplay from "../../components/AppThreadDisplay";
import { selectPostsListInfo } from "../posts/postsSlice";

export const CommunityThreads = (props) =>  {

    const postsList = useSelector(selectPostsListInfo);
    return (
        <div className="app-content">
            <AppThreadDisplay
                postType={props.postsType}
                urlBase={`/community/`}
                posts={postsList.posts}
            />
        </div>
    );
}
