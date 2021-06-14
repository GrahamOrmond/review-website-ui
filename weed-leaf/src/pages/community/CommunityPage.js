import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFilter from '../../components/AppFilter'
import { selectPostsListInfo } from '../posts/postsSlice';
import { SubmitPost } from '../posts/SubmitPost';
import AppPost from '../../components/AppPost'

const renderThread = (threadInfo) => {
    return (
        <AppPost post={threadInfo}/>
    )
}

export const CommunityThreads = (props) =>  {
    
    const postsList = useSelector(selectPostsListInfo);
    let content = []
    postsList.posts.forEach(post => {
        content.push(renderThread(post))
    });

    return (
        <div>
            <AppFilter />
            {content}
        </div>
    );
}

export const CommunityPage = props =>  {

    const { action } = props.match.params;
    let content = "";
    if(action == "submit"){
        content = <SubmitPost />
    }else if(action == null){
        content = <CommunityThreads />;
    }else{
        content = ""
    }

    return (
        <div className="app-content">
            {content}
        </div>
    );
}
