import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import AppCard from './AppCard'


export const AppPostFilter = (props) => {

    const history = useHistory()
    const postType = props.postType === undefined? "reviews" : props.postType.toLowerCase()

    const handleSelectChange = (event) => {
        const selectBox = event.target
        const selectedOption = selectBox.options[selectBox.selectedIndex].id
        if(selectBox.name === "type"){
            history.push(props.urlBase + selectedOption)
        }
    }

    const handleOnClick = (event) => {
        let buttonDisplay = document.getElementById("filter_buttons");
        let filterButtons = buttonDisplay.querySelectorAll(".filter-button")
        filterButtons.forEach(button => {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            }
        });
        event.target.classList.add('active')
    }

    let selectOptions = {
        type: {
            value: "reviews",
            options: [{
                    id: "reviews",
                    label: "Reviews"
                },
                {
                    id: "questions",
                    label: "Questions"
                },
                {
                    id: "threads",
                    label: "Threads"
                }
            ],
            onChange: handleSelectChange
        }
    }
    if(postType == "reviews"){
        selectOptions.rating = {
            value: "5",
            options: [{
                id: "1",
                label: "1 Star"
                },
                {
                    id: "2",
                    label: "2 Stars"
                },
                {
                    id: "3",
                    label: "3 Stars"
                },
                {
                    id: "4",
                    label: "4 Stars"
                },
                {
                    id: "5",
                    label: "5 Stars"
                }
            ],
            onChange: handleSelectChange
        }
    }

    let sortButtons = {
        selected: "new",
        buttons: {
            new: {
                label: "New",
                onClick: handleOnClick
            },
            trending: {
                label: "Trending",
                onClick: handleOnClick
            },
            top: {
                label: "Top",
                onClick: handleOnClick
            }
        }
    }

    return <AppFilter
        selectOptions={selectOptions}
        sortButtons={sortButtons}
    />


}

export const AppProductFilter = (props) => {

    const handleSelectChange = (event) => {
        const selectBox = event.target
        const selectedOption = selectBox.options[selectBox.selectedIndex].id
    }

    const handleOnClick = (event) => {

    }

    let selectOptions = {
        brands: {
            label: "Brands",
            options: [
                
            ]
        },
        type: {
            label: "Product Type",
            options: [
                
            ]
        }

    }

    let sortButtons = {
        selected: "new",
        buttons: {
            new: {
                label: "New",
                onClick: handleOnClick
            },
            trending: {
                label: "Trending",
                onClick: handleOnClick
            },
            top: {
                label: "Top",
                onClick: handleOnClick
            }
        }

    }

    return <AppFilter
        selectOptions={selectOptions}
        sortButtons={sortButtons}
    />
}

const AppFilter = (props) => {

    const renderSelectBoxes = (selectData) => {
        let selectBoxes = []
        for (const [key, input] of Object.entries(selectData)) {
            let options = input.options.map(option => {
                if(option.id == input.value){
                    return (<option id={option.id} selected>{option.label}</option>)
                }
                return (<option id={option.id} >{option.label}</option>)
            })

            selectBoxes.push(
                <select name={key} onChange={(e) => {input.onChange(e)}}>
                    {options}
                </select>
            )
        }
        return selectBoxes;
    }

    const renderButtons = (buttonData) => {
        let buttons = []
        for (const [key, input] of Object.entries(buttonData.buttons)) {
            let className = "app-button filter-button"
            if(key === buttonData.selected){
                className += " active"
            }
            buttons.push(
                <div className={className} onClick={(e) => {input.onClick(e)}}>
                    {input.label}
                </div>
            )
        }
        return buttons
    }

    return (
        <AppCard>
            <div className="app-filter">
                <div className="filter-content">
                    <div className="filter-input">
                        {renderSelectBoxes(props.selectOptions)}
                    </div> 

                    <div className="filter-view">
                        <div className="filter-buttons" id="filter_buttons">
                            {renderButtons(props.sortButtons)}
                        </div>
                    </div>
                </div>
            </div>
        </AppCard>
    );
}
