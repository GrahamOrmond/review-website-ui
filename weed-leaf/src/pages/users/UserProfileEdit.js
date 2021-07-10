import { useState } from "react";
import { AppCard } from "../../components/AppCard";
import { AppForm } from '../../components/AppForm';
import { AppProfile } from "../../components/AppProfile";
import { AppShowcase, ShowcaseItemSelector } from "../../components/AppShowcase";
import './profileEditForms'
import { profileMenuOptions, profileEditForms } from "./profileEditForms";

const ProfileSupport = (props) => {

    return (
        <div className="profile-edit-content">
            Support Page
        </div>
    )
}

const ProfileShowcaseEdit = (props) => {

    const [itemsDisplay, setItemsDisplay] = useState({
        showDisplay: false,
        type: null,
        index: null
    })
    const {
        user,
        formData,
        updateFormData,
        handleSave,
    } = props

    const handleRemoveShowcase = (showcase) => {
        let index = formData.showcase.selected.indexOf(showcase)
        if(index !== -1){
            let newData = {...formData}
            newData.showcase.selected.splice(index, 1);
            updateFormData(newData)
        }
    }

    const handleAddShowcase = (e) => {
        let selectBox = e.target
        const selectedOption = selectBox.options[selectBox.selectedIndex].id
        if(selectedOption !== ''){
            let newData = {...formData}
            newData.showcase.selected.push(selectedOption)
            updateFormData(newData)
            selectBox.value = ''
        }
    }

    const handleShowItemSelect = (type, index) => {
        setItemsDisplay({showDisplay: true, type: type, index: index})
    }

    const renderOptions = () => {
        let data = []
        for (const [key, option] of Object.entries(formData.showcase.options)) {
            if(formData.showcase.selected.includes(key)){
                continue
            }
            
            let selected = key === ''? true : false
            data.push(
                <option id={key} selected={selected}>
                    {option.label}
                </option>
            )
        }
        return data
    }

    const renderShowcases = () => {
        let selectedShowcases = formData.showcase.selected
        let showcases = []
        selectedShowcases.forEach(id => {
            const showcase = formData.showcase.options[id]
            showcases.push(
                <AppShowcase
                    label={showcase.label}
                    type={id}
                    data={showcase.data}
                    isActiveEdit={true}
                    handleRemoveShowcase={handleRemoveShowcase}
                    handleShowItemSelect={handleShowItemSelect}
            />)
        });
        return showcases
    }

    const handleSelectItem = (showcase, item) => {
        let newData = {...formData}

        switch(showcase){
            case "images":
                let showcaseData = newData.showcase.options[showcase].data
                if(itemsDisplay.index != null){
                    let index = itemsDisplay.index
                    if(index > showcaseData.items.length-1){
                        index = showcaseData.items.length
                    }
                    showcaseData.items[index] = item
                    newData.showcase.options[showcase].data = showcaseData
                }else{
                    showcaseData.main = item
                }
                updateFormData(newData)
            break;
            default:
                break
                
        }
        setItemsDisplay({showDisplay: false, type: null, index: null})
    }

    let itemSelector;
    if(itemsDisplay.showDisplay){
        itemSelector = <ShowcaseItemSelector 
            type={itemsDisplay.type}
            user={user}
            handleSelectItem={handleSelectItem}
        />
    }

    return (
        <div className="profile-edit-content">
            <form onSubmit={(e) => handleSave(e)}>
                <div className="profile-showcase-edit">
                    <div className="showcases">
                        { renderShowcases() }
                    </div>
                    <select onChange={handleAddShowcase}>
                        { renderOptions() }
                    </select>
                </div>
                <div className="profile-showcase-save">
                    <button type="submit" className="button-blue">
                        Save
                    </button>
                </div>
            </form>
            {itemSelector}
        </div>
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
            <div className="edit-menu-options">
                {renderMenuOptions()}
            </div>
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

    const handleSaveShowcase = (e) => {
        e.preventDefault()
        console.log(editForms)
    }

    // determine content
    let content;
    switch(selectedMenuOption.id) {
        case "support":
            content = <ProfileSupport />
            break
        case "showcase":
            content = <ProfileShowcaseEdit
                user={user}
                formData={editForms[selectedMenuOption.id]}
                updateFormData={updateFormData}
                handleSave={handleSaveShowcase}
            />
            break
        default:
            content = (<ProfileEditForm
                    formData={editForms[selectedMenuOption.id]}
                    updateFormData={updateFormData}
                    handleSave={handleSaveProfile}
                />)
            break
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
