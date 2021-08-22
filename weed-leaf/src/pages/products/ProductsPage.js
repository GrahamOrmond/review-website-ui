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
    
    // return products list with array of params from url
    return (<ProductsList 
            // split array of params from url if defined
            brands={urlString.brands? urlString.brands.split(',') : [] } // brands string
            productType={urlString.productType? urlString.productType.split(',') : []} // productType string
            category={urlString.category? urlString.category.split(',') : []} // categorty string
        />)
}
