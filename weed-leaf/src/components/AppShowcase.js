import React, { Component } from 'react';


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
            <div className="app-showcase">
                <div className="showcase-title">
                    <h4>Contents</h4>
                </div>
                <div className="showcase-display">
                    <ShowcaseItem />
                    <ShowcaseItem />
                </div>
            </div>
        );
    }
}
export default AppShowcase;