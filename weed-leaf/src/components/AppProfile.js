import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import AppCard from './AppCard'
import AppShowcase from './AppShowcase'
import AppPost from './AppPost'
import AppFilter from './AppFilter';

class ProfileHeader extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {

        let secondaryTitle;
        if(this.props.brand !== undefined){
            secondaryTitle = (
                <div className="profile-info-section">
                    <div className="profile-title">
                        By 
                        <Link to="/brands/Carmel">
                            <h5>{this.props.brand.name}</h5>
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
                                <h4>{this.props.title}</h4>
                            </div>
                            <div className="profile-action">
                                <div className="profile-follow">
                                    Follow
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
                <div className="profile-info-section">
                    <div className="profile-description">
                        {this.props.description}
                    </div>
                </div>
            </div>
        );
    }
}


class ProfileThreads extends Component {

    constructor(props) {
        super(props);

        this.renderPosts = this.renderPosts.bind(this);
        this.postData = [];
    }

    renderPosts(){
        let posts = [];
        this.postData.forEach(post => {
            posts.push(<AppPost />);
        });
        return posts;
    }
    
    render () {
        
        return (
            <div>
                <AppFilter />
                {this.renderPosts()}
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
                    <ProfileHeader 
                    title={this.props.title}
                    description={this.props.description}
                    rating={this.props.rating}    
                />
                </AppCard>
                <AppCard>
                    <ProfileStats />
                </AppCard>
                <ProfileThreads />
            </div>
        );
    }
}
export default AppProfile;
