import React, { Component } from 'react';

class DropdownNav extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="dropdown-nav">
                {this.props.text}
            </div>
        );
    }
}

class DropdownContent extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        return (
            <div className="dropdown-content">
                <DropdownNav text="Brands"/>
                <DropdownNav text="Products"/>
                <div className="content-seperator"></div>
                <DropdownNav text="Log in / Sign Up"/>
            </div>
        );
    }
}

class DropdownButton extends Component {

    constructor(props) {
        super(props);
        this.handleOnClick = props.handleOnClick.bind(this);
    }

    render () {
        
        return (
            <button onClick={this.handleOnClick} className="button-dropdown">
                {this.props.content}
            </button>
        );
    }
}

class AppDropdown extends Component {

    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    // toggles the drop down when clicked
    toggleDropDown(event){
        // get the drop down DOM and toggle it
        let dropdown = event.target.parentElement
            .querySelector(".dropdown-content");
        if(dropdown.classList.contains('active')){ // already active
            dropdown.classList.remove("active"); // hide
        }else{
            dropdown.classList.add("active"); // show
        }
    }

    render () {
        
        return (
            <div className="app-dropdown">
                <DropdownButton 
                    handleOnClick={this.toggleDropDown}
                    content="Menu"
                />
                <DropdownContent />
            </div>
        );
    }
}
export default AppDropdown;
