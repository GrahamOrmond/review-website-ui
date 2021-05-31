import React, { Component } from 'react';

import AppCard from './AppCard';

class AppList extends Component {

    constructor(props) {
        super(props);
        this.renderList = props.renderList.bind(this);
    }
    
    render () {
        
        return (
            <AppCard>
                <div className="app-list">
                    <div className="list-title">
                        Browse Brands from A - Z
                    </div>
                    <div className="list-content">
                        {this.renderList()}
                    </div>
                </div>
            </AppCard>
        );
    }
}
export default AppList;
