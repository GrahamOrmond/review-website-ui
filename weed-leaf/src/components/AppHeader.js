import { AppDropdown, DropdownNav } from './AppDropdown';
import { Link, useHistory, withRouter } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser } from '../pages/oauth/oauthSlice';
import { useDispatch } from 'react-redux';
import { clearPostParams } from '../pages/posts/postsSlice';
import { clearProductParams } from '../pages/products/productsSlice';

const AppSearch = (props) => {

    return (
        <div className="app-search">
            <input placeholder="Search..."></input>
        </div>
    );
}

const HeaderNav = (props) => {

    const {
        activeLink,
        isLoggedIn
    } = props

    const dispatch = useDispatch()
    const history = useHistory()
    
    // main header links
    const headerLinks = [
        {
            'key': 'brands',
            'label': 'Brands',
            'link': '/brands'
        },
        {
            'key': 'products',
            'label': 'Products',
            'link': '/products'
        },
        {
            'key': 'community',
            'label': 'Community',
            'link': '/community'
        }
    ]

    // used to handle nav button clicks
    const handleOnNavClick = (link) => {

        // clear search params to reload data for links
        switch(link){
            case "/community":
                dispatch(clearPostParams())
                break
            case "/products":
                dispatch(clearProductParams())
                break
            default:
                break;
        }


        history.push(link) // change url to match nav link
    }

    return (
        <div className="header-nav">
            <div className="header-nav-buttons">
                <div className="header-nav-links">
                    {
                        headerLinks.map(l => 
                            <Link 
                                key={l.key}
                                onClick={() => handleOnNavClick(l.link)}>
                                <div className={activeLink == l.link? "header-link active" : "header-link"}>
                                    <p>{l.label}</p>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
            <div className="header-search">
                <AppSearch />
            </div>
            <div className="header-dropdown">
                <AppDropdown icon={<MenuIcon />}>
                    {
                        // display default nav links
                        headerLinks.map(l => 
                            <DropdownNav 
                                key={l.key}
                                label={l.label}
                                isMobileOnly={true} // set to only show in small screens
                                handleOnClick={() => handleOnNavClick(l.link)}
                            />
                        )
                    }

                    {
                        // check for logged in user to show rest of options
                        isLoggedIn? 
                            // load user logged in options
                            <div>
                                <DropdownNav 
                                    key="user"
                                    label="Profile"
                                    handleOnClick={() => handleOnNavClick("/user")}
                                />
                                    <DropdownNav 
                                    key="logout"
                                    label="Log Out"
                                    handleOnClick={() => dispatch(logoutUser())} // logout user function
                                />
                            </div>
                        :
                            // show login/register option
                            <DropdownNav 
                                key="login"
                                label="Log In / Sign Up"
                                handleOnClick={() => handleOnNavClick("/login")} // logout user function
                            />
                    }

                    
                </AppDropdown>
            </div>
        </div>
    );
}

const HeaderLogo = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    // handles clicking on the header logo
    // used to set redux store state to refresh info
    const handleLogoClick = () => {
        dispatch(clearPostParams()) // clear posts params to reload data
        history.push("/") // go to home page
    }

    return (
        <div className="header-logo">
            <Link onClick={() => handleLogoClick()}>
                WeedLeaf
            </Link>
        </div>
    );
}

export const AppHeader = (props) => {

    const {
        location, // routing location info
        isLoggedIn
    } = props

    let pathname = location.pathname === '/'? // no path
        '/community' // default community page
        :
        location.pathname;

    return (
        <div className="app-header">
            <HeaderLogo />
            <HeaderNav 
                activeLink={pathname}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}
export default withRouter(AppHeader);
