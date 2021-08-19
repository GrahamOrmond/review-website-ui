import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProductSearchParams, getProductsListInfo, idleProductList } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import { AppProductFilter } from '../../components/AppFilter';
import { useHistory } from 'react-router-dom';

export const ProductsList = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const {
        brands,
        sortBy,
    } = props


    const [filterData, setFilterData] = useState({
        brands: brands,
        sortBy: sortBy
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

    // handle filter select box change
    const handleSelectChange = (e) => {
        console.log(e.target)
    }
    
    // handles filter sort button change
    // used to change the url to match the selected filter options
    const handleSortChange = (e) => {
        let newState = {...filterData}
        newState['sortBy'] = e.target.id
        setFilterData(newState) // set form data
        handleHistoryChange(newState) // change url
    }

    // handle url changes
    const handleHistoryChange = (newState) => {
        history.push(`/products/${newState.sortBy}`)
    }

    return (
        <div className="app-content">
            <AppProductFilter 
                filterData={filterData}
                handleSelectChange={handleSelectChange}
                handleSortChange={handleSortChange}
             />
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
