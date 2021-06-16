import React, { Component } from 'react';
import queryString from 'query-string';
import AppProfile from "../../components/AppProfile";
import { AppProductsDisplay } from "../../components/AppProduct" 
import { ProductsList } from "./ProductsList" 
import { ProductProfile } from './ProductProfile';
import { PostDisplay } from '../posts/PostDisplay';

export const ProductsPage = (props) => {

    const { 
        brandId, 
        productUrlId, 
        displayName, 
        postLink 
    } = props.match.params;
    const type = props.match.params.postsType
    const postsType = type === undefined? "reviews" : type.toLowerCase();
    let urlString = queryString.parse(props.location.search);
    

    if(brandId && productUrlId){ 

        if(postLink){

            let fetchData = {
                brandId: brandId,
                productUrlId: productUrlId,
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
                    <ProductProfile
                        brandId={brandId}
                        productUrlId={productUrlId}
                        postsType={postsType}
                        displayName={displayName}
                    />
                </React.Fragment>
            </div>
        )
    }
    
    return (<ProductsList />)
}
