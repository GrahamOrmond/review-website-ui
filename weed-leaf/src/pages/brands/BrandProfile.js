import { useSelector, useDispatch } from 'react-redux'
import { AppProfile } from '../../components/AppProfile';
import React, { useEffect } from 'react'

import { getBrandView, fetchBrand, clearBrandView, getBrandById, setBrandView } from './brandsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import { AppProductShowcase, AppShowcase, ShowcaseAction, ShowcaseContent } from '../../components/AppShowcase';
import { fetchProducts, getProductsByBrandId, getProductSearchParams, getProductsListInfo } from '../products/productsSlice';
import { AppProduct } from '../../components/AppProduct'

export const BrandProfile = (props) => {

    const dispatch = useDispatch()
    const {
        postsType,
        sortBy,
        brandId
    } = props

    const view = useSelector(getBrandView);
    const brand = useSelector(s => getBrandById(s, brandId))
    const productsListInfo = useSelector(getProductsListInfo)
    const brandProducts = useSelector(s => getProductsByBrandId(s, brandId))
    const existingParams = useSelector(s => getProductSearchParams(s, {'brands': [brandId]}));
    useEffect(() => {
        if(view.status === 'idle'){
            if(!brand){ // no brand found
                dispatch(fetchBrand(brandId))
            }else{
                // brand already loaded and found
                dispatch(setBrandView({ brandId: brand.brandId }))
            }
            return
        }

        if(view.brandId.toLowerCase() 
            !== brandId.toLowerCase()){
            dispatch(clearBrandView())
        }

        // check for existing brand products
        if(productsListInfo.status !== 'loading'
            && !existingParams){ // user hasnt searched by params yet
            dispatch(fetchProducts({"brands": [brandId]})) // search for products
        }
    }, [brand, postsType, brandId, view, dispatch])
    
    if(!brand)
        return (<div></div>)

    return (
            <AppProfile
            id={brand.brandId}
            title={brand.name}
            type="brand"
            rating={brand.rating}
            description={brand.description}
            >
            <AppProductShowcase>
                <ShowcaseContent>
                    {
                        brandProducts.map(p => 
                            <AppProduct 
                                key={p.brandId + '-' + p.urlId}
                                product={p}>
                            </AppProduct>
                        )
                    }
                </ShowcaseContent>
                <ShowcaseAction 
                    actionLink={`/products?brands=${brand.brandId}`}
                    actionTitle="View More"
                />
            </AppProductShowcase>
            <AppThreadDisplay 
                brandId={brand.brandId}
                postType={postsType}
                sortBy={sortBy}
                urlBase={`/brands/${brand.brandId}/`}
            />
        </AppProfile>
    )
}
