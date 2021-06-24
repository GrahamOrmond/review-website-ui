import React, { Component, useEffect } from 'react';
import { AppDropdown } from './AppDropdown';
import { Link, withRouter } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser, LogoutUser } from '../pages/oauth/oauthSlice';
import { useDispatch } from 'react-redux';

const HeaderNavLinks = (props) => {

    const links = [
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
        }
    ]

    const renderLinks = () => {
        return links.map(link => {
            let className = "header-link"
            if(props.activeLink.includes(link.link))
                className += " active"
            return (
                <Link to={link.link} >
                    <div className={className}>
                        <p>{link.label}</p>
                    </div>
                </Link>
            )
        })
    }

    return (
        <div className="header-nav-links">
            {renderLinks()}
        </div>
    )
}


class AppSearch extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="app-search">
                <input placeholder="Search..."></input>
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
                "mobileOnly": true,
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
                'link': '/user/',
                'label': 'Profile'
            },
            {
                'onClick': () => dispatch(logoutUser()),
                'link': '/logout',
                'label': 'Log Out'
            },
        ]   
    }

    const loggedOutLinks = 
    {
        "title": "account",
        "links": [
            {
                'link': '/login',
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
            <div className="header-nav-buttons">
                <HeaderNavLinks  
                activeLink={props.activeLink}
                linkData={links}/>
            </div>
            <div className="header-search">
                <AppSearch />
            </div>
            <div className="header-dropdown">
                <AppDropdown linkData={links}>
                    <MenuIcon />
                </AppDropdown>
            </div>
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
        let pathname = this.props.location.pathname;
        if(pathname == "/")
            pathname = "/community"
        return (
            <div className="app-header">
                <HeaderLogo />
                <HeaderNav 
                activeLink={pathname}
                isLoggedIn={this.props.isLoggedIn}/>
            </div>
        );
    }
}
export default withRouter(AppHeader);
