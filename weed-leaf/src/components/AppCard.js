import React, { Component } from 'react';

class AppCard extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        
        return (
            <div className="app-card">
                {this.props.children}
            </div>
        );
    }
}
export default AppCard;
