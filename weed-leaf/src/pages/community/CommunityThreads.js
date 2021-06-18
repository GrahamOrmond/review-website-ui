import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppThreadDisplay from "../../components/AppThreadDisplay";
import { fetchPosts, selectPostsListInfo } from "../posts/postsSlice";

export const CommunityThreads = (props) =>  {

    const postsList = useSelector(selectPostsListInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        if(postsList.status == 'idle'){
            dispatch(fetchPosts())
        }
    }, [dispatch])

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
