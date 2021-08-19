import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProductSearchParams, getProductsListInfo, idleProductList } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import { AppProductFilter } from '../../components/AppFilter';

export const ProductsList = (props) => {

    const dispatch = useDispatch();
    const {
        brands,
    } = props


    const [filterData, setFilterData] = useState({
        brands: brands
    })


    const productsList = useSelector(getProductsListInfo);
    const existingParams = useSelector(s => getProductSearchParams(s, filterData));
    useEffect(() => {
        if(productsList.status === 'idle'){
            dispatch(fetchProducts(filterData))
            return
        }

        if(productsList.status !== 'loading'
            && !existingParams){
            dispatch(idleProductList())
        }
    }, [productsList, filterData, existingParams, dispatch])

    return (
        <div className="app-content">
            <AppProductFilter filterData />
            {
                productsList.items.map(p => (
                    <AppProduct 
                        key={p.brandId + '-' + p.urlId}
                        product={p}>
                    </AppProduct>
                ))
            }
        </div>
    );
}
