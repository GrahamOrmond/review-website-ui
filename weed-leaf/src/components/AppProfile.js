import { Link } from 'react-router-dom'
import { AppCard } from './AppCard'

const ProfileHeader = (props) =>  {

    const {
        brand,
        title,
        description,
        // rating,
        profileAction,
        actionName
    } = props


    let secondaryTitle;
    if(brand !== undefined){
        secondaryTitle = (
            <div className="profile-info-section">
                <div className="profile-title">
                    By 
                    <Link to="/brands/Carmel">
                        <h5>{brand.name}</h5>
                    </Link>
                </div>
            </div>
        )
    }

        
    return (
        <div className="profile-header">
            <div className="profile-display">
                <div className="profile-image">

                </div>
                <div className="profile-info">
                    <div className="profile-info-section">
                        <div className="profile-title">
                            <h4>{title}</h4>
                        </div>
                        {secondaryTitle}
                        <div className="profile-action">
                            <div className="app-button follow-button" 
                                onClick={(e) => profileAction(e)}>
                                {actionName}
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
            <div className="profile-info-section">
                <div className="profile-description">
                    {description}
                </div>
            </div>
        </div>
    );
}

export const AppProfile = (props) =>  {

    const {
        // id,
        // profileType,
        title,
        description,
        rating,
        children,
        profileAction,
        actionName
    } = props
    
    return (
        <div className="app-profile">
            <AppCard>
                <ProfileHeader 
                title={title}
                description={description}
                rating={rating}
                profileAction={profileAction}
                actionName={actionName} />
            </AppCard>
            {children}
        </div>
    );
}
