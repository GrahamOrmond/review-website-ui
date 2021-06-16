import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useReducer } from 'react'

import { selectProductView, fetchProduct, clearProductView, fetchProductPosts } from './productsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import AppShowcase from '../../components/AppShowcase';
import AppProfile from '../../components/AppProfile';
  
export const ProductProfile = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const dispatch = useDispatch()

    let profile = useSelector(selectProductView);
    let product = profile.product
    useEffect(() => {
        if (product !== null) { // product loaded
            if(product.urlId === props.productUrlId
                && product.brandId === props.brandId) // matches id
                return;
            dispatch(clearProductView()) // clear product if not matching
        }
        dispatch(fetchProduct({ 
            brandId: props.brandId,
            productUrlId: props.productUrlId
        })) // fetch product by id
        .then(res => {
            if(res.meta.requestStatus == "fulfilled"){
                dispatch(fetchProductPosts({
                    brandId: res.payload.brandId,
                    productUri: res.payload.urlId,
                    sortBy: "new"
                }))
            }
        })
    }, [product, dispatch])
    
    let content;
    if(product !== null // loaded
        && product.urlId === props.productUrlId){ // matches id
        content = (
            <AppProfile
            id={product.brandId}
            title={product.name}
            type="product"
            rating={product.rating}
            description={product.description}
        >
            <AppThreadDisplay reviews={product.reviews}/>
        </AppProfile>
        )
    }else{
        content = (
            <div>

            </div>
        )
    }

    return content;
}
