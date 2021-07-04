import React, { Component, useEffect, useState } from 'react';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';

import AppButton from './AppButton';
import { AppDropdown } from './AppDropdown';
import { AppCard } from './AppCard';
import { MediaFilesDisplay } from './MediaFilesDisplay';

import { Link } from 'react-router-dom'

const PostUserInfo = (props) => {

    const linkData = {
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


    const determinePostTime = () => {
        const date = new Date(`${props.date}Z`);
        const timeNow = new Date();

        let timeBetween = timeNow.getTime() - date.getTime()
        let minutes = timeBetween / 60000; // 1 min == 60000 milliseconds
        if(minutes < 1){ // less than minute ago
            return `less than a minute ago`
        }

        let hours = minutes/60
        let days = hours/24
        let months = days/30
        let years = days/365

        let count, message
        if(years >= 1){
            count = Math.round(years)
            message = `${count} year`
        }else if (months >= 1){
            count = Math.round(months)
            message = `${count} month`
        }else if (days >= 1){
            count = Math.round(days)
            message = `${count} day`
        }else if (hours >= 1){
            count = Math.round(hours)
            message = `${count} hour`
        }else {
            count = Math.round(minutes)
            message = `${count} minute`
        }

        if(count > 1){
            message += "s"
        }
        message += " ago"
        return message
    }

    return (
        <div className="post-info">
            <div className="user-info">
                <div>
                    <Link to={`/user/${props.displayName}`}>
                        <h2>
                            {props.displayName}
                        </h2>
                    </Link>
                </div>
                <div>
                    <p>
                        {determinePostTime()}
                    </p>
                </div>
            </div>
            <div className="actions">
                <div className="post-button">
                    <AppDropdown linkData={linkData}>
                        <MoreHorizIcon />
                    </AppDropdown>
                </div>
            </div>
        </div>
    )
}



const PostHeader = (props) => {
    return (
        <div className="post-header">
            <PostUserInfo 
                displayName={props.displayName}
                date={props.date}
            />
            <div className="post-content-info">
                    <div className="post-reference">
                        <div>
                            <Link to={`/brands/${props.brand.brandId}`} >
                                <p>{props.brand.name}</p>
                            </Link>
                        </div>
                        <div className="reference-seperator">
                            <p>/</p>
                        </div>
                        <div>
                            <Link to={`/products/${props.brand.brandId}/${props.product.urlId}`} >
                                <p>{props.product.name}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="post-type">
                        <p>{props.type}</p>
                    </div>
            </div>
            <div className="title">
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

const PostBody = (props) => {

    let propertiesContent;
    if(props.properties 
        && props.properties.length > 0)
    {
        propertiesContent = (
            <PostProperties 
                title="Properties"
                properties={props.properties}
            />
        )
    }

    let mediaFileContent;
    if(props.mediaFiles.length > 1){
        mediaFileContent = <MediaFilesDisplay 
            mediaFiles={props.mediaFiles}
        />
    }
    return (
        <div className="post-body">
            {mediaFileContent}
            {propertiesContent}
            <div className="post-body-content">
                <div>
                    {props.content}
                </div>
            </div>
        </div>
    )
}


const PostFooter = (props) => {
    
    const handleRatingDown = () => {

    }

    const handleRatingUp = () => {

    }

    const handleViewComments = () => {

    }

    return (
        <div className="post-footer">
            <div className="post-notification">
                <div className="content">
                    <AppButton handleOnClick={handleRatingUp}>
                        <ArrowUpwardIcon />
                    </AppButton>
                    <div className="value">
                        <p>{props.upCount - props.downCount}</p>
                    </div>
                    <AppButton handleOnClick={handleRatingDown}>
                        <ArrowDownwardIcon />
                    </AppButton>
                </div>
            </div>
            <div className="post-notification">
                <div className="content">
                    <div className="value">
                        <p>{props.commentCount}</p>
                    </div>
                    <AppButton handleOnClick={handleViewComments}>
                        <ChatIcon />
                    </AppButton>
                </div>
                
            </div>
        </div>
    )
}

const PostProperties = (props) => {

    const renderProperties = () => {

        return props.properties.map(property => {
            return (
                <div class="post-property">
                    <div>
                        {property.property}
                    </div>
                    <div>
                    {property.value}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="post-properties">
            <h3>{props.title}</h3>
            {renderProperties()}
        </div>
    )
}


export const AppPost = (props) => {

    if(!props.post){
        return (
            <div>

            </div>
        )
    }

    const post = props.post
    const displayName = post.displayName.toLowerCase()
    const postUrlId = post.urlId.toLowerCase()
    const postType = post.type.toLowerCase()

    let postUrl;
    if(props.display != "full"){
        postUrl = `/community/user/${displayName}/${postUrlId}`;
        if(post.product.productId != null)
            postUrl = `/products/${post.brand.brandId}/${post.product.urlId}/${postType}s/${displayName}/${postUrlId}`
        else if (post.brand.brandId != null)
            postUrl = `/brands/${post.brand.brandId}/${postType}s/${displayName}/${postUrlId}`
    }
    

    return (
        <AppCard url={postUrl}>
            <div className="app-post">
                <PostHeader 
                    title={post.title}
                    type={post.type}
                    displayName={post.displayName}
                    date={post.dateUpdated}
                    brand={post.brand}
                    product={post.product}
                    />
                <PostBody 
                    mediaFiles={post.mediaFiles}
                    properties={post.productProperties}
                    content={post.content}
                />
                <PostFooter 
                    upCount={post.upCount}
                    downCount={post.downCount}
                    commentCount={0}
                />
            </div>
        </AppCard>
    )
}
