import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppCard } from "../../components/AppCard";
import { AppForm } from '../../components/AppForm';
import { AppProfile } from "../../components/AppProfile";
import { AppShowcase, ShowcaseItemSelector } from "../../components/AppShowcase";
import { updateCurrentUser } from "../oauth/oauthSlice";
import './profileEditForms'
import { profileMenuOptions, profileEditForms } from "./profileEditForms";
import { updateProfile, updateProfileShowcases } from "./usersSlice";

const ProfileSupport = (props) => {

    return (
        <div className="profile-edit-content">
            Support Page
        </div>
    )
}

const ProfileShowcaseEdit = (props) => {

    const [itemSelector, setItemSelector] = useState({
        showcase: null,
    })
    const {
        user,
        formData,
        updateFormData,
        handleSave,
    } = props

    const handleRemoveShowcase = (showcase) => {
        let index = formData.selected.indexOf(showcase)
        if(index !== -1){
            let newData = {...formData}
            newData.selected.splice(index, 1);
            updateFormData(newData)
        }
    }

    const handleAddShowcase = (e) => {
        let selectBox = e.target
        const selectedOption = selectBox.options[selectBox.selectedIndex].id
        if(selectedOption !== ''){
            let newData = {...formData}
            newData.selected.push(selectedOption)
            updateFormData(newData)
            selectBox.value = ''
        }
    }

    const handleShowItemSelect = (showcaseId, index) => {
        setItemSelector({
            showcase: {
                id: showcaseId,
                index: index,
            }
        })
    }

    const renderOptions = () => {
        let data = []
        for (const [key, option] of Object.entries(formData.options)) {
            if(formData.selected.includes(key)){
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
        let selectedShowcases = formData.selected
        let showcases = []
        selectedShowcases.forEach(id => {
            const showcase = formData.options[id]
            showcases.push(
                <AppShowcase
                    showcaseId={id}
                    label={showcase.label}
                    type={showcase.type}
                    data={showcase.data}
                    isActiveEdit={true}
                    handleRemoveShowcase={handleRemoveShowcase}
                    handleShowItemSelect={handleShowItemSelect}
            />)
        });
        return showcases
    }

    const handleSelectItem = (item) => {
        let newData = {...formData}
        const selectedShowcase = newData.options[itemSelector.showcase.id]
        switch(selectedShowcase.type){
            case "multiple": // multiple item showcase
                let index = itemSelector.showcase.index
                if(index > selectedShowcase.data.items.length-1){
                    index = selectedShowcase.data.items.length
                }
                selectedShowcase.data.items[index] = item
                break
            case "single": // single item showcase
                selectedShowcase.data.item = item
                break
            default:
                break
        }
        newData.options[itemSelector.showcase.id].data = selectedShowcase.data
        updateFormData(newData)
        setItemSelector({ showcase: null })
    }

    let itemSelectorContent;
    if(itemSelector.showcase){
        const showcase = formData.options[itemSelector.showcase.id]
        itemSelectorContent = <ShowcaseItemSelector 
            showcaseId={showcase.id}
            type={showcase.data.type}
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
            {itemSelectorContent}
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

    const dispatch = useDispatch()
    const {
        user, // takes in current user
        handleCancelEdit,
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

    const handleSaveProfile = (data) => {
        dispatch(updateProfile(data))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                handleCancelEdit()
                dispatch(updateCurrentUser(res.payload))
            }
        })
    }

    const handleSaveShowcase = (e) => {
        e.preventDefault()
        let showcases = []
        editForms.showcases.selected.forEach(selectedId => {
            showcases.push(editForms.showcases.options[selectedId])
        });
        dispatch(updateProfileShowcases({showcases: showcases})).then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                handleCancelEdit()
            }
        })
    }

    // determine content
    let content;
    switch(selectedMenuOption.id) {
        case "support":
            content = <ProfileSupport />
            break
        case "showcases":
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
