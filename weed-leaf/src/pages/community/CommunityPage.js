import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFilter from '../../components/AppFilter'
import { selectPostsListInfo } from '../posts/postsSlice';
import { SubmitPostPage } from '../posts/SubmitPostPage';
import AppPost from '../../components/AppPost'
import { CommunityThreads } from './CommunityThreads';

export const CommunityPage = props =>  {

    const { 
        type
    } = props.match.params;
    const postsType = type === undefined? "reviews" : type.toLowerCase();

    return (
        <CommunityThreads
            postsType={postsType} 
        />
    )
}
