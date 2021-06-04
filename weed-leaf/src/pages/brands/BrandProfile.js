import { useSelector, useDispatch } from 'react-redux'
import AppProfile from '../../components/AppProfile';
import React, { useEffect } from 'react'

import { selectBrandById } from './brandsSlice'
  
export const BrandProfile = (props) => {
    const brand = useSelector(state => selectBrandById(state, props.brandId))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <AppProfile
            id={brand.brandId}
            title={brand.name}
            type="brand"
            rating={brand.rating}
            description={brand.description}
        />
    );
}
