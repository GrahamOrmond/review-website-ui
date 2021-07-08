import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { selectProductView, fetchProduct, clearProductView, fetchProductPosts } from './productsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import { AppProfile } from '../../components/AppProfile';
  
export const ProductProfile = (props) => {
    
    const {
        postsType,
        productUrlId,
        brandId,
    } = props

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const dispatch = useDispatch()

    let profile = useSelector(selectProductView);
    let product = profile.product
    useEffect(() => {
        if (product !== null) { // product loaded
            if(product.urlId === productUrlId
                && product.brandId === brandId) // matches id
            {
                if(product[postsType].status === 'idle')
                {
                    dispatch(fetchProductPosts({
                        brandId: product.brandId,
                        productUri: product.urlId,
                        type: postsType,
                        sortBy: "new"
                    }))
                }
                return;
            }
            dispatch(clearProductView()) // clear product if not matching
        }
        dispatch(fetchProduct({ 
            brandId: brandId,
            productUrlId: productUrlId
        })) // fetch product by id
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                dispatch(fetchProductPosts({
                    brandId: res.payload.brandId,
                    productUri: res.payload.urlId,
                    type: postsType,
                    sortBy: "new"
                }))
            }
        })
    }, [product, postsType, productUrlId, brandId, dispatch])

    let content;
    if(product !== null // loaded
        && product.urlId === productUrlId){ // matches id
        if(product[postsType].status === 'idle')
        {
            dispatch(fetchProductPosts({
                brandId: product.brandId,
                productUri: product.urlId,
                type: postsType,
                sortBy: "new"
            }))
        }

        content = (
            <AppProfile
            id={product.brandId}
            title={product.name}
            type="product"
            rating={product.rating}
            description={product.description}
        >
            <AppThreadDisplay 
                postType={postsType}
                urlBase={`/products/${product.brandId}/${product.urlId}/`}
                posts={product[postsType].posts}
            />
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
