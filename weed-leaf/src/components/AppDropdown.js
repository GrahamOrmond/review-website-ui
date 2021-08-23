import { Link } from 'react-router-dom'
import { AppButton } from './AppButton';

export const DropdownNav = (props) => {

    const {
        label,
        handleOnClick,
        isMobileOnly
    } = props

    // handles clicking the drop down nav button
    // used to close the drop down menu before handling the buttons action
    const handleOnNavClick = (e) => {
        let dropdown = e.target.closest('.dropdown-content');;
        dropdown.classList.remove("active");
        handleOnClick() // run buttons action
    }

    return (
        <Link onClick={(e) => handleOnNavClick(e)}>
            <div className={isMobileOnly? "dropdown-nav mobile-nav" : "dropdown-nav" }>
                {label}
            </div>
        </Link>
    )
}


export const AppDropdown = (props) => {

    const {
        icon,
        children,
    } = props

    // toggles the drop down when clicked
    // used to toggle drop down menu though classname instead of state 
    // this avoids multiple menus being open
    const toggleDropDown = (event) => {
        event.preventDefault()
        // get the drop down DOM and toggle it
        let dropdown = event.target.closest(".app-dropdown");
        let dropdownContent = dropdown.querySelector(".dropdown-content");
        if(dropdownContent.classList.contains('active')){ // already active
            dropdownContent.classList.remove("active"); // hide
        }else{
            dropdownContent.classList.add("active"); // show
        }
    }

    return (
        <div className="app-dropdown">
            <AppButton handleOnClick={toggleDropDown}>
                { icon }
            </AppButton>
            <div className="dropdown-content">
                <div className="content-area">
                    { children }
                </div>
            </div>
        </div>
    );
}
