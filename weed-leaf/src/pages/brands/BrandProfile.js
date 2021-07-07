import { useSelector, useDispatch } from 'react-redux'
import { AppProfile } from '../../components/AppProfile';
import React, { useEffect, useReducer } from 'react'

import { selectBrandView, fetchBrand, clearBrandView, fetchBrandPosts } from './brandsSlice'
import AppThreadDisplay from '../../components/AppThreadDisplay';
import AppShowcase from '../../components/AppShowcase';
  
export const BrandProfile = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const postsType = props.postsType

    let brandProfile = useSelector(selectBrandView);
    let brand = brandProfile.brand
    useEffect(() => {
        if (brand !== null) { // brand loaded
            if(brand.brandId === props.brandId) // matches id
            {
                if(brand[postsType].status === 'idle')
                {
                    dispatch(fetchBrandPosts({
                        brandId: brand.brandId,
                        type: postsType,
                        sortBy: "new"
                    }))
                }
                return;
            }
            dispatch(clearBrandView()) // clear brand if not matching
        }
        dispatch(fetchBrand(props.brandId)) // fetch brand by id
    }, [brand, dispatch])
    
    let content;
    if(brand // loaded
        && brand.brandId === props.brandId){ // matches id

        if(brand[postsType].status === 'idle')
        {
            dispatch(fetchBrandPosts({
                brandId: brand.brandId,
                type: postsType,
                sortBy: "new"
            }))
        }

        content = (
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
                posts={brand[postsType].posts}
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
