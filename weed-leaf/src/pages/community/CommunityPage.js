import { PostDisplay } from '../posts/PostDisplay';
import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type,
        displayName,
        postLink,
    } = props.match.params;
    const postsType = type === undefined? "reviews" : type.toLowerCase();
    
    const fetchData = {
        postsType: postsType
    }


    if(!postLink){
        return (
            <CommunityThreads
                fetchData={fetchData} 
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
