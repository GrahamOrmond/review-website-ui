import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type
    } = props.match.params;
    const postsType = type === undefined? "reviews" : type.toLowerCase();
    
    const fetchData = {
        postsType: postsType
    }
    return (
        <CommunityThreads
            fetchData={fetchData} 
        />
    )
}
