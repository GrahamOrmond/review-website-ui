import React, { Component } from 'react';
import AppDropdown from './AppDropdown';


class AppSearch extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        
        return (
            <div className="app-search">
                <input></input>
            </div>
        );
    }
}


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
                <AppSearch />
                <HeaderNav />
            </div>
        );
    }
}
export default AppHeader;
