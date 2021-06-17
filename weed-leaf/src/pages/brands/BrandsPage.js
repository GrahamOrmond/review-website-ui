import React, { Component, useEffect } from 'react';
import queryString from 'query-string';

import AppList from "../../components/AppList";
import AppProfile from "../../components/AppProfile";

import { BrandsList } from './BrandsList'
import { BrandProfile } from './BrandProfile'

import { PostDisplay } from '../posts/PostDisplay';

export const BrandsPage = (props) => {
    let urlString = queryString.parse(props.location.search);

    const { 
        brandId, 
        displayName, 
        postLink 
    } = props.match.params;
    const type = props.match.params.postsType
    const postsType = type === undefined? "reviews" : type.toLowerCase();
    let content = "";
    if(brandId){
        if(postLink){

            let fetchData = {
                brandId: brandId,
                type: postsType,
                displayName: displayName,
                urlId: postLink
            }

            return (
                <div className="app-content">
                    <PostDisplay
                        fetchData={fetchData}
                    />
                </div>
            )
        }
        return (
            <div className="app-content">
                <React.Fragment>
                    <BrandProfile
                        brandId={brandId}
                        postsType={postsType}
                        displayName={displayName}
                    />
                </React.Fragment>
            </div>
        )
    }

    return (
        <div className="app-content">
            <AppList title="Browse Brands from A - Z">
                <React.Fragment>
                    <BrandsList />
                </React.Fragment>
            </AppList>
        </div>
    );
}
