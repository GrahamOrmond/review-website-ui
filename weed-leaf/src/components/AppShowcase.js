import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppCard from './AppCard';
import { AppProduct } from './AppProduct';


class ShowcaseItem extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <div className="showcase-item">
                <p>24%</p>
                <p>THC</p>
            </div>
        );
    }
}



class AppShowcase extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <AppCard>
                <div className="app-showcase">
                    <div className="showcase-title">
                        <h4>{this.props.title}</h4>
                    </div>
                    <div className="showcase-display">
                        
                    </div>
                </div>
                <Link to={this.props.actionLink}>
                    <div className="showcase-action app-button">
                        {this.props.actionTitle}
                    </div>
                </Link>
            </AppCard>
        );
    }
}
export default AppShowcase;
