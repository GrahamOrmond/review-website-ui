import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { getProductView, fetchProduct, clearProductView, getProductById, setProductView } from './productsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import { AppProfile } from '../../components/AppProfile';
  
export const ProductProfile = (props) => {

    const dispatch = useDispatch() 
    const {
        postsType,
        productUrlId,
        brandId,
    } = props

    const view = useSelector(s => getProductView(s));
    const product = useSelector(s => getProductById(s, brandId, productUrlId))
    useEffect(() => {
        if(view.status === 'idle'){
            if(!product){ // no product found
                dispatch(fetchProduct({ 
                    brandId: brandId,
                    productUrlId: productUrlId
                }))
            }else{
                // product already loaded and found
                dispatch(setProductView({ 
                    brandId: brandId,
                    productUrlId: productUrlId
                }))
            }
            return
        }

        // clear product if not matching
        if(view.brandId !== brandId
            || view.urlId !== productUrlId){
            dispatch(clearProductView())
        }
    }, [product, view, productUrlId, brandId, dispatch])
    if(!product) return (<div></div>)

    return (
        <AppProfile
            id={product.brandId}
            title={product.name}
            type="product"
            rating={product.rating}
            description={product.description}
        >
        <AppThreadDisplay 
            brandId={product.brandId}
            productId={product.productId}
            postType={postsType}
            urlBase={`/products/${product.brandId}/${product.urlId}/`}
        />
        </AppProfile>
    )
}
