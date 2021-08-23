import { PostDisplay } from '../posts/PostDisplay';
import { CommunityThreads } from './CommunityThreads';
import queryString from 'query-string';

export const CommunityPage = props =>  {

    const { 
        type,
        postLink,
        sort,
        action
    } = props.match.params;
    
    
    if(!postLink){

        let urlString = queryString.parse(props.location.search);
        return (
            <CommunityThreads
                searchValue={urlString.search} // get search param
                postType={type}
                sortBy={sort}
            />
        )
    }
    

    return (
        <div className="app-content">
            <PostDisplay
                displayName={sort}
                urlId={postLink}
                action={action}
            />
        </div>
    )
    
}
