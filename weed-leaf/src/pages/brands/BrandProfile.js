import { useSelector, useDispatch } from 'react-redux'
import { AppProfile } from '../../components/AppProfile';
import React, { useEffect } from 'react'

import { getBrandView, fetchBrand, clearBrandView, getBrandById, setBrandView } from './brandsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import { AppShowcase } from '../../components/AppShowcase';
import { getPostsByBrand } from '../posts/postsSlice';
  
export const BrandProfile = (props) => {

    const dispatch = useDispatch()
    const {
        postsType,
        brandId
    } = props

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const view = useSelector(getBrandView);
    const brand = useSelector(s => getBrandById(s, brandId))
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
    }, [brand, postsType, brandId, view, dispatch])
    
    if(!brand)
        return (<div></div>)

    let showcaseData = {
        type: "MULTIPLE",
        data: {
            type: "PRODUCTS",
            items: []
        }
    }

    return (
            <AppProfile
            id={brand.brandId}
            title={brand.name}
            type="brand"
            rating={brand.rating}
            description={brand.description}
            >
            <AppShowcase
                title="Products"
                type={showcaseData.type}
                data={showcaseData.data}
                actionTitle="View"
                actionLink={"/products?brands=" + brand.name}
                />
            <AppThreadDisplay 
                brandId={brand.brandId}
                postType={postsType}
                urlBase={`/brands/${brand.brandId}/`}
            />
        </AppProfile>
    )
}
