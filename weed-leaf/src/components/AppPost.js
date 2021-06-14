import React, { Component } from 'react';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';

import AppButton from './AppButton';
import AppDropdown from './AppDropdown';
import AppCard from './AppCard';

import { Link } from 'react-router-dom'

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
                        {this.props.displayName}
                    </div>
                    <div className="post-date">
                        {this.props.date}
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
                <PostUserInfo 
                    date={this.props.date}
                    displayName={this.props.displayName}
                    showPostActions={this.showPostActions} />
                <div className="title">
                    <h2>{this.props.title}</h2>
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

        const post = this.props.post
        const displayName = post.displayName.toLowerCase()
        const postUrlId = post.urlId.toLowerCase()
        const postType = post.type.toLowerCase()

        let postUrl = `/community/user/${displayName}/${postUrlId}`;
        if(post.product.productId != null)
            postUrl = `/products/${post.brand.brandId}/${post.product.urlId}/${postType}/${displayName}/${postUrlId}`
        else if (post.brand.brandId != null)
            postUrl = `/brands/${post.brand.brandId}/${postType}/${displayName}/${postUrlId}`

        return (
            <Link to={postUrl}>
                <AppCard>
                    <div className="app-post">
                        <PostHeader 
                            title={post.title}
                            displayName={post.displayName}
                            date={post.dateUpdated}
                            showPostActions={this.showPostActions} />
                        <div className="post-body">
                            {post.content}
                        </div>
                        <div className="post-footer">
                            <div className="post-notification">
                                <div className="content">
                                    <AppButton handleOnClick={this.handleRatingUp}>
                                        <ArrowUpwardIcon />
                                    </AppButton>
                                    <div className="value">
                                        <p>{post.upCount - post.downCount}</p>
                                    </div>
                                    <AppButton handleOnClick={this.handleRatingDown}>
                                        <ArrowDownwardIcon />
                                    </AppButton>
                                </div>
                            </div>
                            <div className="post-notification">
                                <div className="content">
                                    <div className="value">
                                        <p>0</p>
                                    </div>
                                    <AppButton handleOnClick={this.handleRatingDown}>
                                        <ChatIcon />
                                    </AppButton>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </AppCard>
            </Link>
        );
    }
}
export default AppPost;
