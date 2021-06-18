import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectProductsListInfo } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import AppFilter from '../../components/AppFilter';
export const ProductsList = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const productsInfo = useSelector(selectProductsListInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        if(productsInfo.status == 'idle'){
            dispatch(fetchProducts())
        }
    }, [dispatch])



    const renderList = () => {
        return productsInfo.products.map(product => {
            return (<AppProduct 
                product={product}>
            </AppProduct>)
        })
    }

    return (
        <div className="app-content">
            <div className="app-products-display">
                <AppFilter />
                {renderList()}
            </div>
        </div>
    );
}
