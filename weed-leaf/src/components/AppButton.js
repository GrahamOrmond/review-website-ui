import React, { Component } from 'react';

class AppButton extends Component {

    constructor(props) {
        super(props);
        this.handleOnClick = props.handleOnClick.bind(this);
    }

    render () {
        
        return (
            <button onClick={this.handleOnClick} className="app-button">
                {this.props.content}
            </button>
        );
    }
}
export default AppButton;
