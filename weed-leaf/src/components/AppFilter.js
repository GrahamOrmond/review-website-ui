import { useState } from 'react';
import { postOptions } from '../pages/posts/submitPostOptions';
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


const FilterMultiSelect = (props) => {

    const {

    } = props

    const [showFilterOptions, setShowSelectOptions] = useState()

    // handles select options toggle
    const handleToggleSelect = (selectedOption) => {
        if(showFilterOptions === selectedOption){ // same as selected option
            setShowSelectOptions() // remove selected option
        }else { // different filter options
            setShowSelectOptions(selectedOption) // show options for that filter
        }
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
    ]

    return (
        <div className="filter-multi-select">
            <div className="multi-select-buttons">
                {
                    filterButtons.map(f => 
                    <button key={f.id} 
                        className={showFilterOptions === f.id? 'app-button filter-button active' : 'app-button filter-button'} 
                        onClick={() => handleToggleSelect(f.id)}>
                        {f.label}
                    </button>)
                }
            </div>
            {
                showFilterOptions ? 
                <div className="multi-select-content">
                    Options
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
        // handleSelectChange,
        handleSortChange
    } = props

    return (
        <AppCard>
            <div className="app-filter">
                <div className="filter-content">
                    <div className="form-input-group">
                        <FilterMultiSelect />
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
