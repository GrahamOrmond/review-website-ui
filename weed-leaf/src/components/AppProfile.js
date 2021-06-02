import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import AppCard from './AppCard'
import AppShowcase from './AppShowcase'

class ProfileHeader extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
           <div className="profile-header">
                <div className="profile-display">
                    <div className="profile-image">

                    </div>
                    <div className="profile-info">
                        <div className="profile-info-section">
                            <div className="profile-title">
                                <h4>Garlic Breath</h4>
                            </div>
                            <div className="profile-action">
                                <div className="profile-follow">
                                    Follow
                                </div>
                            </div>
                        </div>
                        <div className="profile-info-section">
                            <div className="profile-title">
                                By 
                                <Link to="/brands/Carmel">
                                    <h5>CARMEL</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-info-section">
                    <div className="profile-description">
                        Bred by Thug Pug Genetics in Michigan, Garlic Breath is an Indica dominant hybrid created through crossing GMO with his notorious ""Studly"" Mendo Breath male. This strain features long dense buds covered in resin that deliver unparalleled bag appeal. This strain stays true to its name with a funky aroma of crushed garlic and coffee. The flavours are rich and earthy with a sweet, herbal taste on the exhale. Because it’s just the right thing to do, all our flower is hang dried, hand trimmed, slow cold cured, and hand packaged. We believe fresh and terpy is best, so all our flower is packaged in a nitrogen flushed pouch that features a perfect airtight seal. Non irradiated, obviously.
                    </div>
                </div>
            </div>
        );
    }
}



class ProfileStats extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
           <div className="profile-content">
               <AppShowcase />
            </div>
        );
    }
}




class AppProfile extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <div className="app-profile">
                <AppCard>
                    <ProfileHeader />
                </AppCard>
                <AppCard>
                    <ProfileStats />
                </AppCard>
            </div>
        );
    }
}
export default AppProfile;
