import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, isUserLoggedIn } from '../pages/oauth/oauthSlice';
import { AppThreadFilter } from './AppFilter';
import { AppPost } from './AppPost';
import { AppPostCreate } from './AppPostCreate';
import { fetchPosts, getPostByFilter, getPostsList, getPostsSearchParams, idlePostList } from "../pages/posts/postsSlice";
import { useEffect, useMemo, useState } from 'react';
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
        searchValue,
        urlBase
    } = props

    // set post filter data
    const [filterData, setFilterData] = useState({
        brandId: brandId,
        productId: productId,
        type: postType === undefined? "review" : postType.toLowerCase(), // default review
        sortBy: sortBy === undefined? "new" : sortBy.toLowerCase(), // default new
    })
    
    // create search params for filtering
    // used to filter posts by adding url params that dont need to be stored in state
    let searchParams = useMemo(() => {
        return {...filterData, ...{'search': searchValue}} // add search to data
    }, [filterData, searchValue])

    // get posts by filter data
    const postsList = useSelector(getPostsList)
    const posts = useSelector(s => getPostByFilter(s, searchParams))
    const currentUser = useSelector(s => getCurrentUser(s))
    const existingParams = useSelector(s => getPostsSearchParams(s, searchParams));
    useEffect(() => {
        if(postsList.status === 'idle'){ // list waiting to load
            dispatch(fetchPosts(searchParams)) // fetch by filter data
            return
        }

        if(postsList.status !== 'loading'
            && !existingParams){ // user hasnt searched by params yet
            dispatch(idlePostList()) // idle the post to change view state
        }
    }, [postsList, searchParams, existingParams, dispatch])

    // render all posts
    const renderPosts = () => {
        return posts.map(post => {
            return (
                <AppPost 
                    key={post.postId}
                    preview={true}
                    post={post} 
                    canEdit={currentUser && post.profileId === currentUser.profileId}
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
        let search = searchValue? `?search=${searchValue}` : ''
        history.push(`${urlBase}${newState.type}/${newState.sortBy}${search}`)
    }

    // return posts thread with filter
    return (
        <div>
            { isLoggedIn ? <AppPostCreate urlBase={urlBase} /> : '' }
            <AppThreadFilter
                filterData={filterData}
                handleSelectChange={handleSelectChange}
                handleSortChange={handleSortChange}
            />
            {existingParams && postsList.status !== 'loading'? 
                renderPosts() 
                :
                ''
            }
            <div className="thread-end">
                <h3>
                    {
                        postsList.status !== 'loading'?
                            "Loading"
                            :
                            "End Of Content"
                    }
                </h3>
            </div>
        </div>
    );
        
}
export default AppThreadDisplay;
