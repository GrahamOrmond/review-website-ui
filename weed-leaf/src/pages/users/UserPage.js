import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "../oauth/oauthSlice";
import { UserProfile } from "./UserProfile";
import { UserProfileEdit } from "./UserProfileEdit";
import { clearUserView, fetchUser, getUserByDisplayName, getUserView, updateProfile } from "./usersSlice";

export const UserPage = (props) => {

    const [showEditView, setShowEditView] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch()
    
    const {  
        displayName, 
        postType,
    } = props.match.params;
    const postsType = postType === undefined? "reviews" : postType.toLowerCase();

    const user = useSelector(s => getUserByDisplayName(s, displayName))
    const view = useSelector(getUserView)
    const currentUser = useSelector(getCurrentUser)

    useEffect(() => {

        if(!displayName){
            if(currentUser){
                history.push(`/user/${currentUser.displayName}`)
            }
            return
        }

        if(view.status === "idle") {
             dispatch(fetchUser(displayName))
             return
        } 

        if(view.displayName.toLowerCase() !== displayName.toLowerCase()){
            dispatch(clearUserView())
        }
    }, [user, displayName, currentUser, view, dispatch, history])

    if(!user){ // no user loaded
        return (<div></div>)
    }

    const handleEditProfile = (e) => {
        e.preventDefault()
        setShowEditView(!showEditView)
    }

    const handleSaveProfile = (data) => {
        dispatch(updateProfile(data))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                setShowEditView(false)
                dispatch(updateCurrentUser(res.payload))
                history.push(`/user/${res.payload.displayName}`)
            }
        })
    }


    if(showEditView){
        return  <UserProfileEdit 
            user={currentUser}
            handleCancelEdit={handleEditProfile}
            handleSaveProfile={handleSaveProfile}
        />
    }

    let showEdit
    if(currentUser && user.profileId === currentUser.profileId)
        showEdit = handleEditProfile
    
    return <UserProfile 
        user={user}
        postsType={postsType} 
        handleShowEdit={showEdit}
    />
}
