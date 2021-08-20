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
        filterData,
        handleApplyFilter
    } = props

    // tracks the selected filter option
    // used to show filter options for specific filter
    const [selectedFilter, setSelectedFilter] = useState() 

    // tracks if the filter has changed
    // used to determine if the results need to be updated or not
    const [hasFilterChanged, setHasFilterChanged] = useState(false) 

    // holds selected filter options
    // used to track the selected filter options for each filter
    const [selectedFilterOptions, setSelectedOptions] = useState({
        'brands': [...filterData.brands],
        'productType': [...filterData.productType],
        'category': [...filterData.category],
    })

    // setup filter options
    // used to populate the brands list and dynamic filter options
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
    // used to toggle on and off filter options
    const handleToggleSelect = (selected) => {
        if(selected === selectedFilter){ // same as selected filter
            setSelectedFilter() // remove selected option
        }else { // different filter options
            setSelectedFilter(selected) // show options for that filter
        }
    }

    // handles selecting filter options
    // used to add id's to a list of selected filter options for later filtering
    const handleSelectOption = (id) => {
        let selectedOps = {...selectedFilterOptions} // copy options
        selectedOps[selectedFilter] = selectedOps[selectedFilter].concat([id]) // add seleced option
        setSelectedOptions(selectedOps) // update selected options
        setHasFilterChanged(true) // update that the filter has changed
    }

    // handles deselecting filter options
    // used to removed id's from a list of selected filter options
    const handleDeselectOption = (index) => {
        let selectedOps = {...selectedFilterOptions} // copy filters
        let options = [...selectedOps[selectedFilter]] // copy options
        options.splice(index, 1) // remove seleced option
        selectedOps[selectedFilter] = options // update selected options
        setSelectedOptions(selectedOps) // update selected options state state
        setHasFilterChanged(true) // update that the filter has changed
    }
    
    // render selected filter button options
    // used to render filter options when switching between filters
    const renderFilterOptions = () => {

        const selectedOptions = selectedFilterOptions[selectedFilter] // list of all selected options

        // selected brand filter
        if(selectedFilter === 'brands'){ 
            return brandsListInfo.items.map(f => { // display list of brand options
                const index = selectedOptions.indexOf(f.brandId) // check if option is selected
                if(index !== -1) // option is selected
                {
                    // return active button class with deselect option
                    return <button key={f.brandId} 
                            className="app-button filter-button active"
                            onClick={() => handleDeselectOption(index)}>
                        {f.name}
                    </button>
                }

                // option not selected return normal
                return <button key={f.brandId} 
                        className="app-button filter-button"
                        onClick={() => handleSelectOption(f.brandId)}>
                    {f.name}
                </button>
            })
        }

        // other filter options
        // find the product filter by id
        const filter = productFilterInfo.filters
            .find(f => f.id === selectedFilter)
        return filter.options.map(f => { // return filter options
            const index = selectedOptions.indexOf(f.id) // check if option is selected
            if(index !== -1) // option is selected
            {
                 // return active button class with deselect option
                 return <button key={f.id} 
                        className="app-button filter-button active"
                        onClick={() => handleDeselectOption(index)}>
                    {f.label}
                </button>
            }

            // option not selected return normal
            return <button key={f.id} 
                    className="app-button filter-button"
                    onClick={() => handleSelectOption(f.id)}>
                {f.label}
            </button>
        })
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
                <div className="select-filter-buttons">
                    {
                        // display filter buttons with its selected filter options
                        filterButtons.map(f => 
                            <button key={f.id} 
                                className={selectedFilter === f.id? 'app-button filter-button active' : 'app-button filter-button'} 
                                onClick={() => handleToggleSelect(f.id)}>
                                {f.label}
                                <div className="selected-options">
                                    {selectedFilterOptions[f.id].map(p => <label>
                                        {p}
                                    </label>)}
                                </div>
                            </button>)
                    }
                </div>
                {
                    hasFilterChanged ? // filter has changed
                        // show apply filter button
                        <div className="apply-filter-button">
                            <button className="button-blue filter-button"
                                onClick={() => {
                                    setHasFilterChanged(false) // remove apply button
                                    handleApplyFilter(selectedFilterOptions) // apply filters
                                }}
                            >
                                Filter
                            </button>
                        </div>
                        : // no filter change
                        '' // hide apply button
                }
            </div>
            {
                // display filter options for any seleced filter
                selectedFilter ? 
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
        sortBy,
        filterData,
        handleApplyFilter,
        handleSortChange
    } = props

    return (
        <AppCard>
            <div className="app-filter">
                <div className="filter-content">
                    <div className="form-input-group">
                        <FilterMultiSelect 
                            filterData={filterData}
                            handleApplyFilter={handleApplyFilter}
                        />
                    </div> 

                    <div className="filter-view">
                        <FilterSortButtons 
                            activeSort={sortBy}
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
