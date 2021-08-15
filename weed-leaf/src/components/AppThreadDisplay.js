import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../pages/oauth/oauthSlice';
import { AppThreadFilter } from './AppFilter';
import { AppPost } from './AppPost';
import { AppPostCreate } from './AppPostCreate';
import { fetchPosts, getPostByFilter, getPostsList, getPostsSearchParams, idlePostList } from "../pages/posts/postsSlice";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const AppThreadDisplay = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn = useSelector(isUserLoggedIn);
    const {
        brandId,
        productId,
        postType,
        sortBy,
    } = props

    // set post filter data
    const [filterData, setFilterData] = useState({
        type: postType,
        brandId: brandId,
        productId: productId,
        sortBy: sortBy,
    })

    
    // get posts by filter data
    const postsList = useSelector(getPostsList)
    const posts = useSelector(s => getPostByFilter(s, filterData))
    const existingParams = useSelector(s => getPostsSearchParams(s, filterData));
    useEffect(() => {
        if(postsList.status === 'idle'){ // list waiting to load
            dispatch(fetchPosts(filterData)) // fetch by filter data
            return
        }

        if(postsList.status !== 'loading'
            && !existingParams){ // user hasnt searched by params yet
            dispatch(idlePostList()) // idle the post to change view state
        }
    }, [postsList, filterData, existingParams, dispatch])

    // render all posts
    const renderPosts = () => {
        return posts.map(post => {
            return (
                <AppPost 
                key={post.postId}
                preview={true}
                post={post} 
            />)
        })
    }

    // handle filter select box change
    const handleSelectChange = (e) => {
        let newState = {...filterData}
        const selectedOption = e.target.options[e.target.selectedIndex].id
        newState[e.target.name] = selectedOption
        setFilterData(newState) // set form data
        handleHistoryChange(newState) // change url
    }
    
    const handleSortChange = (e) => {
        let newState = {...filterData}
        newState['sortBy'] = e.target.id
        setFilterData(newState) // set form data
        handleHistoryChange(newState) // change url
    }

    // handle url changes
    const handleHistoryChange = (newState) => {
        history.push(`/community/${newState.type}/${newState.sortBy}`)
    }

    // return posts thread with filter
    return (
        <div>
            { isLoggedIn ? <AppPostCreate urlBase={props.urlBase} /> : '' }
            <AppThreadFilter
                filterData={filterData}
                handleSelectChange={handleSelectChange}
                handleSortChange={handleSortChange}
            />
            {posts.length > 0? renderPosts() : ''}
            <div className="thread-end">
                <h3>End Of Content</h3>
            </div>
        </div>
    );
        
}
export default AppThreadDisplay;
