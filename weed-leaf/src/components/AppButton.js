import React, { Component } from 'react';

class AppButton extends Component {

    constructor(props) {
        super(props);
        this.handleOnClick = props.handleOnClick.bind(this);
    }

    render () {
        
        return (
            <div onClick={this.handleOnClick} className="app-button">
                {this.props.children}
            </div>
        );
    }
}
export default AppButton;
