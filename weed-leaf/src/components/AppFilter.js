import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import AppCard from './AppCard'

export const AppFilter = (props) => {

    const postType = props.postType === undefined? "reviews" : props.postType.toLowerCase()

    const history = useHistory()

    const handleSelectChange = () => {
        let postOptions = document.getElementById("post_type_select");
        const type = postOptions.value.toLowerCase()
        history.push(props.urlBase + type)
    }

    const postOptionNames = ["Reviews", "Questions", "Threads"]
    const postOptions = postOptionNames.map(option => {
        
        let optionValue = option.toLowerCase()
        if(postType == optionValue){
            return (<option id={optionValue} selected>{option}</option>)
        }
        return (<option id={optionValue}>{option}</option>)
    })


    let reviewOptions;
    if(postType == "reviews")
        reviewOptions = (
            <select>
                <option id="1">1 Star</option>
                <option id="2">2 Stars</option>
                <option id="3">3 Stars</option>
                <option id="4">4 Stars</option>
                <option id="5">5 Stars</option>
            </select>
        )


    return (
        <AppCard>
            <div className="app-filter">
                <div className="filter-content">
                    <div className="filter-input">
                        <select id="post_type_select" onChange={(e) => {handleSelectChange()}}>
                            {postOptions}
                        </select>

                        {reviewOptions}
                    </div> 

                    <div className="filter-view">
                        <div className="filter-buttons">
                            <div className="app-button filter-button active">
                                New
                            </div>
                            <div className="app-button filter-button">
                                Trending
                            </div>
                            <div className="app-button filter-button">
                                Top
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppCard>
    );
}
export default AppFilter;
