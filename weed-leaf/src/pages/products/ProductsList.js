import React, { useEffect, useMemo, useState } from 'react'
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
        searchValue,
        brands,
        productType,
        category,
        feelings,
        helps,
        smell,
    } = props
    
    // holds the current sort by state
    // used to track sortby seperate from filters
    const [sortBy, setSortBy] = useState(sort? sort : "new")

    // holds the current state of the products applied filter 
    // used to track and load product list results
    const [filterData, setFilterData] = useState({
        brands: brands,
        productType: productType,
        category: category,
        feelings: feelings,
        helps: helps,
        smell: smell,
    })

    // create search params for filtering
    // used to filter posts by adding url params that dont need to be stored in state
    let searchParams = useMemo(() => {
        const params = {
            brands: filterData.brands,
            productType: filterData.productType,
            category: filterData.category,
            effects: [...filterData.feelings, ...filterData.helps, ...filterData.smell],
        }
        return {...params, ...{'search': searchValue}} // add search to data
    }, [filterData, searchValue])

    // get product lists 
    // used to fetch products by the given filter
    const productsListInfo = useSelector(getProductsListInfo);
    const productsList = useSelector(s => getProductsByFilter(s, searchParams));
    const existingParams = useSelector(s => getProductSearchParams(s, searchParams));
    useEffect(() => {
        if(productsListInfo.status === 'idle'){
            dispatch(fetchProducts(searchParams))
            return
        }

        if(productsListInfo.status !== 'loading'
            && !existingParams){
            dispatch(idleProductList())
        }
    }, [productsListInfo, searchParams, existingParams, dispatch])

    // handle filter select box change
    // used to update the current filter state
    const handleApplyFilter = (newFilterData) => {
        setFilterData(newFilterData) // set filter data 

        // update url to include params
        let paramsData = {...newFilterData}
        Object.keys(paramsData).forEach(k => paramsData[k].length === 0
            && delete paramsData[k])
        const params = new URLSearchParams(paramsData).toString()
        history.push(`/products/${sortBy}?${params}`)
    }
    
    // handles filter sort button change
    // used to change the url to match the selected filter options
    const handleSortChange = (e) => {
        setSortBy(e.target.id) // set sort by state
        handleHistoryChange({}, e.target.id) // change url
    }

    // handle url changes
    const handleHistoryChange = (newState, sort) => {
        let search = searchValue? `?search=${searchValue}` : ''
        history.push(`/products/${sort}${search}`)
    }

    return (
        <div className="app-content">
            <AppProductFilter 
                sortBy={sortBy}
                filterData={filterData}
                handleApplyFilter={handleApplyFilter}
                handleSortChange={handleSortChange}
             />
            <div className="product-list">
                {
                    existingParams && productsList.status !== 'loading'?
                        productsList.map(p => (
                            <AppProduct 
                                key={p.brandId + '-' + p.urlId}
                                product={p}>
                            </AppProduct>
                        ))
                    :
                        ''
                }
            </div>
        </div>
    );
}
