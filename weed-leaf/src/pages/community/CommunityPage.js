import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type
    } = props.match.params;
    const postsType = type === undefined? "reviews" : type.toLowerCase();

    return (
        <CommunityThreads
            postsType={postsType} 
        />
    )
}
