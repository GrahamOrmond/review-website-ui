import { AppProfile } from  "../../components/AppProfile"
import AppThreadDisplay from "../../components/AppThreadDisplay";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserView, fetchUserInfo, fetchUserPosts, followProfile, selectCurrentUser, selectUserView, unfollowProfile } from "./usersSlice";


const EditUserProfile = (props) => {

    const {
        user,
        handleSaveProfileEdit
    } = props

    const actionName = "Save"
    const profileAction = handleSaveProfileEdit

    return (
        <div className="app-content">
            <AppProfile
                title={user.displayName}
                profileAction={profileAction}
                actionName={actionName}
            />
        </div>
    )
}

export const UserProfile = (props) => {

    const [showEditView, setShowEditView] = useState(false);

    const dispatch = useDispatch()
    const {  
        displayName, 
        postsType,
    } = props;

    const userProfileView = useSelector(selectUserView)
    const currentUser = useSelector(selectCurrentUser)
    const user = userProfileView.user

    useEffect(() => {
        if(user === null){
            if(userProfileView.status != "loading")
                dispatch(fetchUserInfo(displayName)) // fetch brand by id
            return
        }

        if(user.displayName !== displayName)
            dispatch(clearUserView()) // clear brand if not matching
    }, [user, dispatch])

    if(!user){
        return (
            <div>
                
            </div>
        )
    }
    
    if(user[postsType].status === 'idle')
    {
        dispatch(fetchUserPosts({
            displayName: user.displayName,
            type: postsType,
            sortBy: "new"
        }))
    }

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

    const handleEditProfile = (e) => {
        e.preventDefault()
        setShowEditView(true)
    }

    const handleSaveProfileEdit = (e) => {
        e.preventDefault()
        setShowEditView(false)
    }

    let profileAction, actionName
    if(user.profileId == currentUser.profileId){
        actionName = "Edit"
        profileAction = handleEditProfile
        if(showEditView)
            return <EditUserProfile 
                user={currentUser}
                handleSaveProfileEdit={handleSaveProfileEdit}
            />
    }
    else if(!user.isFollowing){
        actionName = "Follow"
        profileAction = handleFollowProfile
    }else{
        actionName = "Unfollow"
        profileAction = handleUnfollowProfile
    }

    return (
        <div className="app-content">
            <AppProfile
                profileAction={profileAction}
                title={displayName}
                actionName={actionName}
            />
            <AppThreadDisplay 
                postType={postsType}
                urlBase={`/user/${displayName}/`}
                posts={user[postsType].posts}
            />
        </div>
    )
}
