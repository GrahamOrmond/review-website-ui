import React, { Component } from 'react';
import AppButton from './AppButton';

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
        
        let content = '';
        if (this.props.showDropDown){
            content = [
                <DropdownNav text="Brands"/>,
                <DropdownNav text="Products"/>,
                <div className="content-seperator"></div>,
                <DropdownNav text="Log in / Sign Up"/>
            ]
        }

        return (
            <div className="dropdown-content">
                {content}
            </div>
        );
    }
}




class AppDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDropDown: false,
        }

        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    toggleDropDown(){
        let dropState = true;
        if(this.state.showDropDown){
            dropState = false;
        }
        this.setState({
            showDropDown: dropState,
        })
    }

    render () {
        
        return (
            <div className="app-dropdown">
                <AppButton 
                    handleOnClick={this.toggleDropDown}
                    content="Menu"
                />
                <DropdownContent 
                    showDropDown={this.state.showDropDown}
                />
            </div>
        );
    }
}
export default AppDropdown;
