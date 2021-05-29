import React, { Component } from 'react';
import AppDropdown from './AppDropdown';

class HeaderNav extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        
        return (
            <div className="header-nav">
                <AppDropdown />
            </div>
        );
    }
}

class HeaderLogo  extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        
        return (
            <div className="header-logo">
                WeedLeaf
            </div>
        );
    }
}


class AppHeader extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        
        return (
            <div className="app-header">
                <HeaderLogo />
                <HeaderNav />
            </div>
        );
    }
}
export default AppHeader;
