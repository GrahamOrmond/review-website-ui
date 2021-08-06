import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppCard } from "../../components/AppCard";
import { AppInput } from '../../components/AppForm';
import { AppProfile } from "../../components/AppProfile";
import { AppShowcase, ShowcaseItemSelector } from "../../components/AppShowcase";
import { AppTextEditor } from "../../components/AppTextEditor";
import { updateCurrentUser, updateCurrentUserShowcases } from "../oauth/oauthSlice";
import './profileEditForms'
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
                    type={showcase.type}
                    data={showcase.data}
                    isActiveEdit={true}
                    handleRemoveShowcase={handleRemoveShowcase}
                    handleShowItemSelect={handleShowItemSelect}
            />)
        });
        return showcases
    }

    const handleSelectItem = (itemId) => {
        let newData = {...formData}
        const selectedShowcase = newData.options[itemSelector.showcase.id]
        if(selectedShowcase.type.includes("SINGLE")){
            selectedShowcase.data.items[0] = {
                referenceId : itemId
            }
        }else{
            let index = itemSelector.showcase.index
            if(index > selectedShowcase.data.items.length-1){
                index = selectedShowcase.data.items.length
            }
            selectedShowcase.data.items[index] = {
                referenceId : itemId
            }
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

    const menuOptions = {
        "general": {
            "label": "General",
        },
        "showcase": {
            "label": "Showcase",
        },
        "support": {
            "label": "Support",
        },
        "privacy": {
            "label": "Privacy",
        },
    }

    // renders menu options
    const renderMenuOptions = () => {
        let options = []

        // render menu options
        for (const [key, value] of Object.entries(menuOptions)) {
            // determine className
            let className = "edit-menu-option" 
            if(selectedOption.id === value.id) // options is selected
                className += " active" // add to className

            // add option to list
            options.push(
                <div key={key}
                    className={className}
                    onClick={() => handleMenuChange(key)}>
                    <p>{value.label}</p>
                </div>
            )
        }
        return options // return list of options
    }

    return (
        <div className="profile-edit-menu">
            <div className="edit-menu-options">
                { renderMenuOptions() }
            </div>
        </div>
    )
}

// profile form input
const ProfileEditForm = (props) => {

    const {
        formData,
        handleSave,
    } = props

    const handleInputChange = (e) => {
        const newState = {...formData.current}
        newState[e.target.name] = e.target.value
        formData.current = newState
    }

    return (
        <div className="profile-edit-content">
            <div className="form-content">
                <AppInput 
                    name="displayName"
                    label="Display Name" 
                    type="text"
                    placeholder=''
                    value={formData.displayName}
                    handleChange={handleInputChange}
                />
                <AppTextEditor 
                    name="bio"
                    editId="bio"
                    label="Bio"
                    placeholder=""
                    value={formData.bio}
                />
            </div>
            <div className="form-footer">
                <button type="submit" 
                    className="button-blue" 
                    onClick={handleSave}>
                    Save
                </button>
            </div>
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

    const [selectedMenuOption, setSelectedMenuOption] = useState("general")
    const [formData, setFormData] = useState({
        profileData: {
            displayName: user.displayName,
            bio: user.bio,
        },
        showcaseData: {
            selected: []
        },
    })

    // handle menu option change
    const handleMenuChange = (option) => {
        setSelectedMenuOption(option)
    }

    const handleSaveProfile = () => {
        dispatch(updateProfile(formData.profileData))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                handleCancelEdit()
                dispatch(updateCurrentUser(res.payload))
            }
        })
    }

    const handleSaveShowcase = (e) => {
        e.preventDefault()
        // let showcases = []
        // editForms.showcases.selected.forEach(selectedId => {
        //     const showcase = editForms.showcases.options[selectedId]
        //     showcases.push({
        //         type: showcase.type,
        //         data: showcase.data
        //     })
        // });
        // dispatch(updateProfileShowcases({showcases: showcases})).then(res => {
        //     if(res.meta.requestStatus === "fulfilled"){
        //         dispatch(updateCurrentUserShowcases(res.payload))
        //         handleCancelEdit()
        //     }
        // })
    }

    // determine content
    let content;
    switch(selectedMenuOption) {
        case "support":
            content = <ProfileSupport />
            break
        case "showcases":
            content = <ProfileShowcaseEdit
                user={user}
                formData={formData.showcaseData}
                handleSave={handleSaveShowcase}
            />
            break
        default:
            content = (<ProfileEditForm
                    formData={formData.profileData}
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
