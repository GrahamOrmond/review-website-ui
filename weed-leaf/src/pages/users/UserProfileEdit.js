import { useState } from "react";
import { AppCard } from "../../components/AppCard";
import { AppForm } from '../../components/AppForm';
import { AppProfile } from "../../components/AppProfile";
import './profileEditForms'
import { profileMenuOptions, profileEditForms } from "./profileEditForms";

const ProfileSupport = (props) => {

    return (
        <AppCard>
        </AppCard>
    )
}

// edit profile menu 
const ProfileEditMenu = (props) => {

    const {
        selectedOption,
        handleMenuChange
    } = props

    // renders menu options
    const renderMenuOptions = () => {
        let options = []
        
        for (const [key, value] of Object.entries(profileMenuOptions)) { // 
            let className = "edit-menu-option"
            if(selectedOption.id === value.id)
                className += " active"

            options.push(
                <div key={value.id} 
                    className={className} 
                    onClick={() => handleMenuChange(key)}>
                    <p>{value.label}</p>
                </div>
            )
        }
        return options
    }

    return (
        <div className="profile-edit-menu">
            {renderMenuOptions()}
        </div>
    )
}

// profile form input
const ProfileEditForm = (props) => {

    const {
        formData,
        updateFormData,
        handleSave,
    } = props

    const submitButtons = {
        "post": {
            label: "Save",
            handleSubmit: handleSave
        }
    }

    return (
        <div className="profile-edit-content">
            <AppForm
                title=""
                submitTitle="Save Profile"
                method="POST"
                formData={formData}
                submitButtons={submitButtons}
                updateFormData={updateFormData}
            >
            </AppForm>
        </div>
    )
}

// user profile edit
export const UserProfileEdit = (props) => {

    const {
        user, // takes in current user
        handleCancelEdit,
        handleSaveProfile // saves the user profile
    } = props
    
    const [selectedMenuOption, setSelectedMenuOption] = useState(profileMenuOptions.general)
    const [editForms, setEditForms] = useState(profileEditForms(user))

    // handle menu option change
    const handleMenuChange = (key) => {
        setSelectedMenuOption(profileMenuOptions[key])
    }

    // handle form update
    const updateFormData = (newState) => {
        let forms = {...editForms}
        forms[selectedMenuOption.id] = newState
        setEditForms(forms)
    }

    // determine content
    let content;
    if(selectedMenuOption.id === "support") // support page
    {
        content = (
            <ProfileSupport />
        )
    }else{ // return form data
        content = (
            <ProfileEditForm 
                formData={editForms[selectedMenuOption.id]}
                updateFormData={updateFormData}
                handleSave={handleSaveProfile}
            />
        )
    }

    return (
        <div className="app-content">
            <AppProfile
                title={user.displayName}
                profileAction={handleCancelEdit}
                actionName="Cancel"
            >
                <AppCard>
                    <div className="profile-edit">
                        <ProfileEditMenu 
                            selectedOption={selectedMenuOption}
                            handleMenuChange={handleMenuChange}
                        />
                        {content}
                    </div>
                </AppCard>
            </AppProfile>
        </div>
    )
}
