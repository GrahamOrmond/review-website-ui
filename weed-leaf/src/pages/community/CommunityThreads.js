import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppThreadDisplay from "../../components/AppThreadDisplay";
import { fetchPosts, getPostsList, getPostsSearchParams, idlePostList } from "../posts/postsSlice";

export const CommunityThreads = (props) =>  {

    const dispatch = useDispatch();
    const {
        fetchData
    } = props

    const postsList = useSelector(getPostsList);
    const existingParams = useSelector(s => getPostsSearchParams(s, fetchData));
    useEffect(() => {
        if(postsList.status === 'idle'){
            dispatch(fetchPosts(fetchData))
            return
        }

        if(postsList.status !== 'loading'
            && !existingParams){
            dispatch(idlePostList())
        }
    }, [postsList, existingParams, fetchData, dispatch])

    return (
        <div className="app-content">
            <AppThreadDisplay
                postType={props.postsType}
                urlBase={`/community/`}
                posts={postsList.items}
            />
        </div>
    );
}
