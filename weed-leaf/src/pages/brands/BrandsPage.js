import React from 'react';
import queryString from 'query-string';

import { AppList } from "../../components/AppList";

import { BrandsList } from './BrandsList'
import { BrandProfile } from './BrandProfile'

import { PostDisplay } from '../posts/PostDisplay';

export const BrandsPage = (props) => {
    
    const { 
        brandId, 
        displayName, 
        postLink 
    } = props.match.params;
    const type = props.match.params.postsType
    const postsType = type === undefined? "review" : type.toLowerCase();
    if(brandId){
        if(postLink){
            return (
                <div className="app-content">
                    <PostDisplay
                        displayName={displayName}
                        urlId={postLink}
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

    let urlString = queryString.parse(props.location.search);
    const fetchData = {
        isCraft: urlString.isCraft
    }

    return (
        <div className="app-content">
            <AppList title="Browse Brands from A - Z">
                <React.Fragment>
                    <BrandsList 
                        fetchData={fetchData}
                    />
                </React.Fragment>
            </AppList>
        </div>
    );
}
