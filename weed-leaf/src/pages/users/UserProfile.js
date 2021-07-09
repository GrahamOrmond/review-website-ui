import { AppProfile } from  "../../components/AppProfile"
import AppThreadDisplay from "../../components/AppThreadDisplay";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserView, fetchUser, followProfile, getUserByDisplayName, getUserView, selectUserView, unfollowProfile } from "./usersSlice";
import { getCurrentUser } from "../oauth/oauthSlice";
import { fetchPost } from "../posts/postsSlice";

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

    const user = useSelector(s => getUserByDisplayName(s, displayName))
    const view = useSelector(getUserView)
    const currentUser = useSelector(getCurrentUser)

    useEffect(() => {
        if(view.status === "idle") {
             dispatch(fetchUser(displayName))
             return
        } 
        if(view.displayName.toLowerCase() !== displayName.toLowerCase()){
            dispatch(clearUserView())
        }
    }, [user, displayName, view, dispatch])

    if(!user){
        return (<div></div>)
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

    // determine profile action button
    let profileAction, actionName
    if(currentUser // user logged in
        && user.profileId === currentUser.profileId){ // user view own profile 
        actionName = "Edit"
        profileAction = handleEditProfile
        if(showEditView) // show user edit?
            return <EditUserProfile 
                user={currentUser}
                handleSaveProfileEdit={handleSaveProfileEdit}
            />
    }else if(!user.isFollowing){
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
                posts={[]}
            />
        </div>
    )
}
