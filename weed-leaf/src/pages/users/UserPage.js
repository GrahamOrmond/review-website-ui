import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCurrentUser } from "./usersSlice";

export const UserPage = (props) => {
    let currentUser = useSelector(selectCurrentUser)
    const history = useHistory()

    let {  
        displayName, 
    } = props.match.params;

    if(!displayName && currentUser.user){
        displayName = currentUser.user.displayName
        history.push('/user/' + displayName)
    }
        

    return (
        <div className="app-content">
            {displayName}
        </div>
    )
}
