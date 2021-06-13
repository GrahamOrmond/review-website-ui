import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AppButton from './AppButton';

const DropdownNav = (props) => {

    const closeDropdown = (event) => {
        let dropdown = event.target.closest('.dropdown-content');;
        dropdown.classList.remove("active");

        if(typeof props.handleOnClick == 'function')
            props.handleOnClick()
    }

    return (
        <div className="dropdown-nav" onClick={(e) => closeDropdown(e)}>
            {props.text}
        </div>
    );
}

class DropdownContent extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        return (
            <div className="dropdown-content">
                {this.props.children}
            </div>
        );
    }
}

class AppDropdown extends Component {

    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    // toggles the drop down when clicked
    toggleDropDown(event){
        // get the drop down DOM and toggle it
        let dropdown = event.target.closest(".app-dropdown");
        let dropdownContent = dropdown.querySelector(".dropdown-content");
        if(dropdownContent.classList.contains('active')){ // already active
            dropdownContent.classList.remove("active"); // hide
        }else{
            dropdownContent.classList.add("active"); // show
        }
    }

    renderOptions(){
        let renderedData = [];
        this.props.linkData['linkSections'].forEach(function (e, index){

            if(index > 0){
                renderedData.push(<div className="content-seperator"></div>)
            }

            e['links'].forEach(i => {
                if(i['onClick'] === undefined){
                    renderedData.push(
                        <Link to={i['link']} >
                            <DropdownNav text={i['label']} />
                        </Link>
                    );
                }else{
                    renderedData.push(
                        <DropdownNav 
                            handleOnClick={i['onClick']}
                            text={i['label']} 
                        />
                    );
                }
            }); 
        });
        return renderedData;
    }

    render () {
        
        return (
            <div className="app-dropdown">
                <AppButton handleOnClick={this.toggleDropDown}>
                    {this.props.children}
                </AppButton>
                <DropdownContent>
                    {this.renderOptions()}
                </DropdownContent>
            </div>
        );
    }
}
export default AppDropdown;
