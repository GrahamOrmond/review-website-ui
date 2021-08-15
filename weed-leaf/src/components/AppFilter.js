import { postOptions } from '../pages/posts/submitPostOptions';
import { AppCard } from './AppCard'
import { AppSelect } from './AppForm';


const FilterButtons = (props) => {

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

export const AppProductFilter = (props) => {
    
    const {
        // filterData,
        // handleSelectChange
    } = props

    return (
        <AppCard>
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
                        <FilterButtons 
                            activeSort={filterData.sortBy}
                            handleSortChange={handleSortChange}
                        />
                    </div>
                </div>
            </div>
        </AppCard>
    )
}
