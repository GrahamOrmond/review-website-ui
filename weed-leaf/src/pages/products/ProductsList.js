import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectProductsListInfo } from './productsSlice';
import { AppProduct } from '../../components/AppProductsDisplay'

function renderList(products){
    return products.map(product => {
        return (<AppProduct 
            product={product}>
        </AppProduct>)
    })
}

export const ProductsList = () => {
    const productsInfo = useSelector(selectProductsListInfo);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    let content;
    if (productsInfo.status === 'loading') {
        content = (<div className="loader">Loading...</div>)
    } else if (productsInfo.status === 'succeeded') {
        content = renderList(productsInfo.products);
    } else if (productsInfo.status === 'error') {
        content = (<div>{productsInfo.error}</div>)
    }

    return (
        <div className="list-content">
            {content}
        </div>
    );
}
