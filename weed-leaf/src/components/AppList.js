import React, { Component } from 'react';

import { AppCard } from './AppCard';

class AppList extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <AppCard>
                <div className="app-list">
                    <div className="list-title">
                        {this.props.title}
                    </div>
                    <div className="list-display">
                        {this.props.children}
                    </div>
                </div>
            </AppCard>
        );
    }
}
export default AppList;
