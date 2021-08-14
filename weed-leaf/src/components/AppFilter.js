import { postOptions } from '../pages/posts/submitPostOptions';
import { AppCard } from './AppCard'
import { AppSelect } from './AppForm';


const FilterButtons = (props) => {

    const {
        handleOnClick
    } = props

    return (
        <div className="filter-buttons" id="filter_buttons">
            <div
                className="app-button filter-button"
                onClick={handleOnClick}>
                New
            </div>
            <div
                className="app-button filter-button"
                onClick={handleOnClick}>
                Trending
            </div>
            <div
                className="app-button filter-button"
                onClick={handleOnClick}>
                Top
            </div>
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
        handleSelectChange
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
                        <FilterButtons />
                    </div>
                </div>
            </div>
        </AppCard>
    )
}
