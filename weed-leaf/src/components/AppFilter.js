import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, getBrandsListInfo } from '../pages/brands/brandsSlice';
import { postOptions } from '../pages/posts/submitPostOptions';
import { fetchProductFilters, getProductFilterInfo } from '../pages/products/productsSlice';
import { AppCard } from './AppCard'
import { AppSelect } from './AppForm';


const FilterSortButtons = (props) => {

    const {
        handleSortChange,
        activeSort
    } = props

    // sort buttons
    const buttons = [
        {
            'id': 'new',
            'label': 'New'
        },
        {
            'id': 'trending',
            'label': 'Trending'
        },
        {
            'id': 'top',
            'label': 'Top'
        }
    ]



    return (
        <div className="filter-buttons" id="filter_buttons">
            {
                // render sort buttons
                buttons.map(b => {
                    // check for active sort button to extend class
                    const activeClass = activeSort === b.id? ' active' : ''
                    return (
                        <div
                            className={"app-button filter-button" + activeClass}
                            onClick={handleSortChange}
                            id={b.id}>
                            {b.label}
                        </div>
                    )
                })
            }
        </div>
    )
}

// mutltiple select options for filter button
// used to display filter button along side multiple filter options to select
const FilterMultiSelect = (props) => {

    const dispatch = useDispatch()
    const {
        // handleSelectChange
    } = props

    // tracks the selected filter option
    const [selectedFilterOption, setSelectedFilterOption] = useState()

    // get filter options
    const brandsListInfo = useSelector(getBrandsListInfo)
    const productFilterInfo = useSelector(getProductFilterInfo)
    useEffect(() => {
        if(brandsListInfo.status === "idle"){ // no brands loaded
            dispatch(fetchBrands({})) // get all brands
        }

        if(productFilterInfo.status === "idle"){
            dispatch(fetchProductFilters({})) // get all product filter options
        }
    }, [brandsListInfo, productFilterInfo, dispatch])

    // handles select options toggle
    const handleToggleSelect = (selectedOption) => {
        if(selectedFilterOption === selectedOption){ // same as selected option
            setSelectedFilterOption() // remove selected option
        }else { // different filter options
            setSelectedFilterOption(selectedOption) // show options for that filter
        }
    }

    // render selected filter button options
    const renderFilterOptions = () => {
        if(selectedFilterOption === 'brands'){ // selected brand filter
            return brandsListInfo.items.map(f => // display list of brand options
                <button key={f.brandId} 
                    className="app-button filter-button">
                    {f.name}
                </button>
            )
        }

        // find the product filter by id
        const filter = productFilterInfo.filters
            .find(f => f.id === selectedFilterOption)
        return filter.options.map(f => // return filter option buttons
            <button key={f.id} 
                className="app-button filter-button">
                {f.label}
            </button>
        )
    }

    // list of filter buttons
    const filterButtons = [
        {
            'id': 'brands',
            'label': 'Brand +'
        },
        {
            'id': 'productType',
            'label': 'Product Type +'
        },
        {
            'id': 'category',
            'label': 'Product Category +'
        },
    ]
    
    return (
        <div className="filter-multi-select">
            <div className="multi-select-buttons">
                {
                    // display filter buttons
                    filterButtons.map(f => 
                        <button key={f.id} 
                            className={selectedFilterOption === f.id? 'app-button filter-button active' : 'app-button filter-button'} 
                            onClick={() => handleToggleSelect(f.id)}>
                            {f.label}
                        </button>)
                }
            </div>
            {
                selectedFilterOption ? 
                <div className="multi-select-content">
                    {
                        // display selected filter button options
                        renderFilterOptions()
                    }
                </div>
                :
                ''
            }
        </div>
    )
}



export const AppProductFilter = (props) => {
    
    const {
        filterData,
        handleSelectChange,
        handleSortChange
    } = props

    return (
        <AppCard>
            <div className="app-filter">
                <div className="filter-content">
                    <div className="form-input-group">
                        <FilterMultiSelect 
                            handleSelectChange={handleSelectChange}
                        />
                    </div> 

                    <div className="filter-view">
                        <FilterSortButtons 
                            activeSort={filterData.sortBy}
                            handleSortChange={handleSortChange}
                        />
                    </div>
                </div>
            </div>
        </AppCard>
    )
}

export const AppThreadFilter = (props) => {
    
    const {
        filterData,
        handleSelectChange,
        handleSortChange
    } = props

    return (
        <AppCard>
            <div className="app-filter">
                <div className="filter-content">
                    <div className="form-input-group">
                        <AppSelect 
                            name="type"
                            label="Type"
                            selectedValue={filterData.type}
                            options={postOptions.type}
                            handleOnChange={handleSelectChange}
                        />
                        {
                            // show rating if type review
                            filterData.type === "review"? <AppSelect 
                                name="rating"
                                label="Rating"
                                selectedValue={filterData.rating}
                                options={postOptions.rating}
                                handleOnChange={handleSelectChange}
                            /> : ''
                        }
                    </div> 

                    <div className="filter-view">
                        <FilterSortButtons 
                            activeSort={filterData.sortBy}
                            handleSortChange={handleSortChange}
                        />
                    </div>
                </div>
            </div>
        </AppCard>
    )
}
