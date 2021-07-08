import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectProductsListInfo } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import { AppProductFilter } from '../../components/AppFilter';
import { isSearchParamsEqual } from '../../helpers/generalHelper';

export const ProductsList = (props) => {

    const {
        brands
    } = props

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const productsInfo = useSelector(selectProductsListInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        let fetchData = {
            brands: brands
        }
        if(productsInfo.status === 'idle' 
            || !isSearchParamsEqual(productsInfo.params, fetchData)){
            dispatch(fetchProducts(fetchData))
        }
    }, [brands, productsInfo, dispatch])

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
                <AppProductFilter />
                {renderList()}
            </div>
        </div>
    );
}
