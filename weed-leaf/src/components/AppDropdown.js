import { Link } from 'react-router-dom'
import { closeAllDropDownMenus } from '../helpers/generalHelper';

import AppButton from './AppButton';

const DropdownNav = (props) => {

    const closeDropdown = (event) => {
        let dropdown = event.target.closest('.dropdown-content');;
        dropdown.classList.remove("active");
        props.handleOnClick()
    }

    const className = props.mobileOnly? "dropdown-nav mobile-nav" : "dropdown-nav"
    if(props.handleOnClick){
        return (
            <div className={className} onClick={(e) => closeDropdown(e)}>
                {props.text}
            </div>
        )
    }

    return (
        <Link to={props.link} onClick={(e) => closeAllDropDownMenus(e)}>
            <div className={className}>
                {props.text}
            </div>
        </Link>
    )
}

const DropdownContent = (props) => {

    return (
        <div className="dropdown-content">
            {props.children}
        </div>
    );
}

export const AppDropdown = (props) => {

    // toggles the drop down when clicked
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

    const renderOptions = () => {
        let data = []
        props.linkData.linkSections.forEach(section => {
            section.links.forEach(link => {
                data.push(
                    <DropdownNav 
                        key={link.link}
                        mobileOnly={section.mobileOnly}
                        handleOnClick={link.onClick}
                        text={link.label} 
                        link={link.link}
                    />
                )
            })
        })
       return data
    }

    return (
        <div className="app-dropdown">
            <AppButton handleOnClick={toggleDropDown}>
                {props.children}
            </AppButton>
            <DropdownContent>
                {renderOptions()}
            </DropdownContent>
        </div>
    );
}
