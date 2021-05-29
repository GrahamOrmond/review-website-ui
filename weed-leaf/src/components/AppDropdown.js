import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class DropdownNav extends Component {

    constructor(props) {
        super(props);

        this.closeDropdown = this.closeDropdown.bind(this);
    }

    closeDropdown(event){
        let dropdown = event.target.closest('.dropdown-content');;
        dropdown.classList.remove("active");
    }


    render () {
        return (
            <div className="dropdown-nav" onClick={this.closeDropdown}>
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
                <Link to="/brands">
                    <DropdownNav to="/brands" text="Brands"/>
                </Link>

                <Link to="/products">
                    <DropdownNav text="Products"/>
                </Link>

                <div className="content-seperator"></div>

                <Link to="/account/login">
                    <DropdownNav text="Log in / Sign Up"/>
                </Link>
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
