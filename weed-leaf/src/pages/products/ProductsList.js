import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProductsByFilter, getProductSearchParams, getProductsListInfo, idleProductList } from './productsSlice';
import { AppProduct } from '../../components/AppProduct'
import { AppProductFilter } from '../../components/AppFilter';
import { useHistory } from 'react-router-dom';

export const ProductsList = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const {
        sort,
        // brands,
        // productType,
        // category,
    } = props

    // holds the current sort by state
    // used to track sortby seperate from filters
    const [sortBy, setSortBy] = useState(sort)

    // holds the current state of the products applied filter 
    // used to track and load product list results
    const [filterData, setFilterData] = useState({
        brands: [],
        productType: [],
        category: [],
    })

    // get product lists 
    // used to fetch products by the given filter
    const productsListInfo = useSelector(getProductsListInfo);
    const productsList = useSelector(s => getProductsByFilter(s, filterData));
    const existingParams = useSelector(s => getProductSearchParams(s, filterData));
    useEffect(() => {
        if(productsListInfo.status === 'idle'){
            dispatch(fetchProducts(filterData))
            return
        }

        if(productsListInfo.status !== 'loading'
            && !existingParams){
            dispatch(idleProductList())
        }
    }, [productsListInfo, filterData, existingParams, dispatch])

    // handle filter select box change
    // used to update the current filter state
    const handleApplyFilter = (newFilterData) => {
        setFilterData(newFilterData)
    }
    
    // handles filter sort button change
    // used to change the url to match the selected filter options
    const handleSortChange = (e) => {
        setSortBy(e.target.id) // set sort by state
        handleHistoryChange({}, e.target.id) // change url
    }

    // handle url changes
    const handleHistoryChange = (newState, sort) => {
        history.push(`/products/${sort}`)
    }

    return (
        <div className="app-content">
            <AppProductFilter 
                sortBy={sortBy}
                filterData={filterData}
                handleApplyFilter={handleApplyFilter}
                handleSortChange={handleSortChange}
             />
            {
                productsList.map(p => (
                    <AppProduct 
                        key={p.brandId + '-' + p.urlId}
                        product={p}>
                    </AppProduct>
                ))
            }
        </div>
    );
}
