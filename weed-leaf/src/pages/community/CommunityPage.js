import { PostDisplay } from '../posts/PostDisplay';
import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type,
        displayName,
        postLink,
        sort,
    } = props.match.params;
    const postType = type === undefined? "review" : type.toLowerCase();
    const sortBy = sort === undefined? "new" : sort.toLowerCase();
    
    if(!postLink){
        return (
            <CommunityThreads
                postType={postType}
                sortBy={sortBy}
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
