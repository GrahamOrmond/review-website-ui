import React, { Component } from 'react';
import queryString from 'query-string';
import AppProfile from "../../components/AppProfile";
import { AppProductsDisplay } from "../../components/AppProductsDisplay" 
import { ProductsList } from "./ProductsList" 
import { ProductProfile } from './ProductProfile';
import { PostDisplay } from '../posts/PostDisplay';

export const ProductsPage = (props) => {

    const { 
        brandId, 
        productUrlId, 
        postsType, 
        displayName, 
        postLink 
    } = props.match.params;
    

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
                        productUrlId={productUrlId} />
                </React.Fragment>
            </div>
        )
    }

    let getByBrandId = brandId;
    let params = queryString.parse(props.location.search);
    console.log(params)
    return (
        <div className="app-content">
            <AppProductsDisplay>
                <React.Fragment>
                    <ProductsList />
                </React.Fragment>
            </AppProductsDisplay>
        </div>
    )
}
