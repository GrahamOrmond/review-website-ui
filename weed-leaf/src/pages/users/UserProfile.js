import { AppProfile } from  "../../components/AppProfile"
import AppThreadDisplay from "../../components/AppThreadDisplay";
import { useDispatch } from "react-redux";
import { followProfile, unfollowProfile, } from "./usersSlice";

export const UserProfile = (props) => {

    const dispatch = useDispatch()
    const {  
        user, 
        postsType,
        handleShowEdit,
    } = props;

    const handleFollowProfile = (e) => {
        e.preventDefault()
        const postData = {
            id: user.profileId
        }
        dispatch(followProfile(postData))
    }

    const handleUnfollowProfile = (e) => {
        e.preventDefault()
        dispatch(unfollowProfile(user.profileId))
    }

    // determine profile action button
    let profileAction, actionName
    if(handleShowEdit){
        profileAction = handleShowEdit
        actionName = "Edit"
    }else if(!user.isFollowing){
        profileAction = handleFollowProfile
        actionName = "Follow"
    }else{
        profileAction = handleUnfollowProfile
        actionName = "Unfollow"
    }

    return (
        <div className="app-content">
            <AppProfile
                title={user.displayName}
                description={user.bio}
                profileAction={profileAction}
                actionName={actionName}
            >
            <AppThreadDisplay 
                postType={postsType}
                urlBase={`/user/${user.displayName}/`}
                posts={[]}
            />
            </AppProfile>
        </div>
    )
}
