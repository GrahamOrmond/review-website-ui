import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectProductsListInfo } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import AppFilter from '../../components/AppFilter';
import { isSearchParamsEqual } from '../../helpers/generalHelper';

export const ProductsList = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    let fetchData = {}
    if(props.brands)
        fetchData.brands = props.brands

    const productsInfo = useSelector(selectProductsListInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        if(productsInfo.status == 'idle' || !isSearchParamsEqual(productsInfo.params, fetchData)){
            dispatch(fetchProducts(fetchData))
        }
    }, [fetchData, dispatch])

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
