import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../oauth/oauthSlice";
import { UserProfile } from "./UserProfile";



export const UserPage = (props) => {
    let currentUser = useSelector(getCurrentUser)
    const history = useHistory()
    
    let {  
        displayName, 
        postType,
    } = props.match.params;
    const postsType = postType === undefined? "reviews" : postType.toLowerCase();

    if(!displayName && currentUser){
        displayName = currentUser.displayName
        history.push('/user/' + displayName)
    }
    
    if(displayName){
        return <UserProfile 
            displayName={displayName}
            postsType={postsType} 
        />
    }
        
    return (
        <div className="app-content">
        </div>
    )
}
