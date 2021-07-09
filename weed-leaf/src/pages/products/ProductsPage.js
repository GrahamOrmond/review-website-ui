import React, { } from 'react';
import queryString from 'query-string';
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
    
    if(brandId && productUrlId){ 

        if(postLink){

            return (
                <div className="app-content">
                    <PostDisplay
                        brandId={brandId}
                        productUrlId={productUrlId}
                        type={postsType}
                        displayName={displayName}
                        urlId={postLink}
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
    let urlString = queryString.parse(props.location.search);
    
    const fetchData = {
        brands: urlString.brands
    }
    return (<ProductsList fetchData={fetchData}/>)
}
