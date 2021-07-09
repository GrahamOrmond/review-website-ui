import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProductSearchParams, getProductsListInfo, idleProductList } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import { AppProductFilter } from '../../components/AppFilter';

export const ProductsList = (props) => {

    const dispatch = useDispatch();
    const {
        fetchData
    } = props

    const listInfo = useSelector(getProductsListInfo);
    const existingParams = useSelector(s => getProductSearchParams(s, fetchData));
    useEffect(() => {
        
        if(listInfo.status === 'idle'){
            dispatch(fetchProducts(fetchData))
            return
        }

        if(listInfo.status !== 'loading'
            && !existingParams){
            dispatch(idleProductList())
        }
    }, [listInfo, fetchData, existingParams, dispatch])

    const renderList = () => {
        return listInfo.products.map(p => {
            return (
                <AppProduct 
                    key={p.brandId + '-' + p.urlId}
                    product={p}>
                </AppProduct>
            )
        })
    }

    return (
        <div className="app-content">
            <div className="app-products-display">
                <AppProductFilter />
                {renderList()}
            </div>
        </div>
    );
}
