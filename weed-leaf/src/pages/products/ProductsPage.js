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
        postLink,
        sort,
        type,
        action
    } = props.match.params;
    
    if(brandId && productUrlId){ 

        if(postLink){

            return (
                <div className="app-content">
                    <PostDisplay
                        displayName={sort}
                        urlId={postLink}
                        action={action}
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
                        postsType={type}
                        sortBy={sort}
                        displayName={displayName}
                    />
                </React.Fragment>
            </div>
        )
    }
    let urlString = queryString.parse(props.location.search);
    
    // return products list with array of params from url
    return (<ProductsList 
            searchValue={urlString.search} // get search param
            // split array of params from url if defined
            brands={urlString.brands? urlString.brands.split(',') : [] } // brands string
            productType={urlString.productType? urlString.productType.split(',') : []} // productType string
            category={urlString.category? urlString.category.split(',') : []} // categorty string
            feelings={urlString.feelings? urlString.feelings.split(',') : []} // effects string
            helps={urlString.helps? urlString.helps.split(',') : []} // effects string
            smell={urlString.smell? urlString.smell.split(',') : []} // effects string
        />)
}
