import { PostDisplay } from '../posts/PostDisplay';
import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type,
        displayName,
        postLink,
        sort,
    } = props.match.params;
    
    
    if(!postLink){
        return (
            <CommunityThreads
                postType={type}
                sortBy={sort}
            />
        )
    }

    return (
        <div className="app-content">
            <PostDisplay
                displayName={displayName}
                urlId={postLink}
            />
        </div>
    )
    
}
