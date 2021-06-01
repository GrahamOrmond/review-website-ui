import React, { Component } from 'react';
import AppDropdown from './AppDropdown';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';

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

        this.linkData = {
            "linkSections": 
            [
                {
                    "title": "main",
                    "links": [
                        {
                            'link': '/brands',
                            'label': 'Brands'
                        },
                        {
                            'link': '/products',
                            'label': 'Products'
                        },
                        {
                            'link': '/community',
                            'label': 'Community'
                        },
                    ]
                },
                {
                    "title": "account",
                    "links": [
                        {
                            'link': '/account/login',
                            'label': 'Log In / Sign Up'
                        },
                    ]
                },
            ]
        }
    }

    

    render () {
        
        return (
            <div className="header-nav">
                <AppDropdown linkData={this.linkData}>
                    <MenuIcon />
                </AppDropdown>
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
                <Link to="/">
                    WeedLeaf
                </Link>
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
