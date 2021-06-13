import React, { Component, useEffect } from 'react';
import AppDropdown from './AppDropdown';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser, LogoutUser } from '../pages/oauth/oauthSlice';
import { useDispatch } from 'react-redux';

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

const HeaderNav = (props) => {
    const dispatch = useDispatch()

    const linkData = {
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
        ]
    }

    const loggedInLinks = 
    {
        "title": "account",
        "links": [
            {
                'onClick': () => dispatch(logoutUser()),
                'link': '/account/logout',
                'label': 'Log Out'
            },
        ]   
    }

    const loggedOutLinks = 
    {
        "title": "account",
        "links": [
            {
                'link': '/account/login',
                'label': 'Log In / Sign Up'
            },
        ]
    }

    let links = JSON.parse(JSON.stringify(linkData))
    if(props.isLoggedIn){
        links.linkSections.push(loggedInLinks)
    }else{
        links.linkSections.push(loggedOutLinks)
    }

    return (
        <div className="header-nav">
            <AppDropdown linkData={links}>
                <MenuIcon />
            </AppDropdown>
        </div>
    );
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
                <HeaderNav isLoggedIn={this.props.isLoggedIn}/>
            </div>
        );
    }
}
export default AppHeader;
