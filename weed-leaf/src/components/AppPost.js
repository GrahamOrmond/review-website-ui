import React, { Component } from 'react';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';

import AppButton from './AppButton';
import AppDropdown from './AppDropdown';
import AppCard from './AppCard';

class PostUserInfo extends Component {

    constructor(props) {
        super(props);

        this.showPostActions = props.showPostActions.bind(this);

        this.linkData = {
            "linkSections": 
            [
                {
                    "title": "main",
                    "links": [
                        {
                            'link': '/post/report',
                            'label': 'Report'
                        },
                    ]
                },
            ]
        }
    }

    


    render () {
        
        return (
            <div className="post-info">
                <div className="user-info">
                    <div className="post-profile-picture">

                    </div>
                    <div className="user-name">
                        Gmoney
                    </div>
                    <div className="post-date">
                        13h
                    </div>
                </div>
                <div className="actions">
                    <div className="post-button">
                        <AppDropdown linkData={this.linkData}>
                            <MoreHorizIcon />
                        </AppDropdown>
                    </div>
                </div>
            </div>
        );
    }
}


class PostHeader extends Component {

    constructor(props) {
        super(props);

        this.showPostActions = props.showPostActions.bind(this);
    }

    render () {
        
        return (
            <div className="post-header">
                <PostUserInfo showPostActions={this.showPostActions} />
                <div className="title">
                    <h2>Carmel MAC 1 @ 20.07% THC and packaged 04-07-2021 with 4.26% total terpenes (grabbed this on sale 20% off) </h2>
                </div>
            </div>
        );
    }
}

class AppPost extends Component {

    constructor(props) {
        super(props);

        this.showPostActions = this.showPostActions.bind(this);
        this.handleRatingUp = this.handleRatingUp.bind(this);
        this.handleRatingDown = this.handleRatingDown.bind(this);
    }

    showPostActions(){
        console.log("post actions")
    }

    handleRatingUp(){

    }

    handleRatingDown(){
        
    }

    render () {
        
        return (
            <AppCard>
                <div className="app-post">
                    <PostHeader showPostActions={this.showPostActions} />
                    <div className="post-body">
                        This is the post body
                    </div>
                    <div className="post-footer">
                        <div className="post-notification">
                            <div className="content">
                                <AppButton handleOnClick={this.handleRatingUp}>
                                    <ArrowUpwardIcon />
                                </AppButton>
                                <div className="value">
                                    <p>20</p>
                                </div>
                                <AppButton handleOnClick={this.handleRatingDown}>
                                    <ArrowDownwardIcon />
                                </AppButton>
                            </div>
                        </div>
                        <div className="post-notification">
                            <div className="content">
                                <div className="value">
                                    <p>33</p>
                                </div>
                                <AppButton handleOnClick={this.handleRatingDown}>
                                    <ChatIcon />
                                </AppButton>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </AppCard>
        );
    }
}
export default AppPost;
