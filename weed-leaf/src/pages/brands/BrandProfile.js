import { useSelector, useDispatch } from 'react-redux'
import { AppProfile } from '../../components/AppProfile';
import React, { useEffect } from 'react'

import { getBrandView, fetchBrand, clearBrandView, getBrandById } from './brandsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import { AppShowcase } from '../../components/AppShowcase';
  
export const BrandProfile = (props) => {

    const dispatch = useDispatch()
    const {
        postsType,
        brandId
    } = props

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let view = useSelector(getBrandView);
    let brand = useSelector(s => getBrandById(s, brandId))

    useEffect(() => {
        if(view.status === "idle") {
            dispatch(fetchBrand(brandId))
            return
       } 

       if(view.brandId.toLowerCase() 
            !== brandId.toLowerCase()){
            dispatch(clearBrandView())
       }
    }, [brand, postsType, brandId, dispatch])
    
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
            <AppShowcase
                title="Products"
                actionTitle="View"
                actionLink={"/products?brands=" + brand.name}
                />
            <AppThreadDisplay 
                postType={postsType}
                urlBase={`/brands/${brand.brandId}/`}
                posts={[]}
            />
        </AppProfile>
    )
}
