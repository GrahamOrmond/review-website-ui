import { PostDisplay } from '../posts/PostDisplay';
import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type,
        displayName,
        postLink,
    } = props.match.params;
    const postType = type === undefined? "reviews" : type.toLowerCase();
    
    if(!postLink){
        return (
            <CommunityThreads
                postType={postType}
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
