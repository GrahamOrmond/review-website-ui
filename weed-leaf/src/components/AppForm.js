import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { AppButton } from './AppButton';

export const AppFileInput = (props) => {

    const {
        label,
        name,
        error,
        oldFiles,
        newFiles,
        handleOnChange,
    } = props

    const acceptedFiles = [
        "image/*", "video/*"
    ]

    const handleFileValidation = (file) => {
        for (let i = 0; i < acceptedFiles.length; i++) {
            const acceptedInfo = acceptedFiles[i].split("/")
            const fileInfo  = file.type.split("/")
            if(fileInfo[0] === acceptedInfo[0]){
                if(acceptedInfo[1] === '*' 
                    || fileInfo[1] === acceptedInfo[1]){
                        return true;
                    }
            }
        }
        return false
    }

    const handleAddFile = (e) => {
        const selectedFile = e.target.files[0];
        e.target.value = '';
        const isFileValid = handleFileValidation(selectedFile)
        if(!isFileValid){
            return
        }
        handleOnChange(selectedFile)
    }

    const handleRemoveFile = (e, file) => {
        const fileInput = e.target.closest('.form-input').querySelector("input")
        e.target.value = ''
        handleOnChange(file, true)
    }

    const handleViewImage = (file) => {
        window.open(URL.createObjectURL(file),'Image','');
    }

    const renderFiles = (files) => {
        return files.map(file => <div className="form-file">
            <div className="name">
                <p onClick={(e) => handleViewImage(e, file)}>
                    {file.originalFileName}
                    {file.name}
                </p>
            </div>
            <div className="action">
                <AppButton handleOnClick={(e) => handleRemoveFile(e, file)}>
                    <CloseIcon />
                </AppButton>
            </div>
        </div>
        )
    }

    return (
        <div className="form-input">
            <label>{label}</label>
            <input 
                name={name}
                onChange={(e) => handleAddFile(e)}
                type="file"
            />
            <label className="input-error">{error}</label>
            <div className="form-files-list">
                { oldFiles? renderFiles(oldFiles) : "" }
                { newFiles? renderFiles(newFiles) : "" }
            </div>
        </div>
    );
}

export const AppSelect = (props) => {

    const {
        label,
        name,
        selectedValue,
        handleOnChange,
        options,
    } = props

    const valueSelected = selectedValue? selectedValue : '' 
    const renderSelectOptions = () => {
    
        let data = []
        for (const [key, option] of Object.entries(options)) {

            data.push(
                <option id={key} selected={valueSelected === key}>
                    {option.label}
                </option>
            )
        }
        return data
    }
    
    return (
        <div className="form-input">
            <label>{label}</label>
            <select name={name}

                onChange={(e) => handleOnChange(e)}>
                { renderSelectOptions() }
            </select>
        </div>
    );
}

export const AppInput = (props) => {

    const {
        label,
        name,
        type,
        value,
        placeholder,
        handleChange,
        error,
    } = props
    
    return (
        <div className="form-input">
            <label>{label}</label>
            <input 
                name={name}
                onChange={handleChange}
                type={type}
                value={value} 
                placeholder={placeholder} 
            />
            <label className="input-error">{error}</label>
        </div>
    );
}

export const AppHiddenInput = (props) => {
    
    return (
        <input 
                name={props.name}
                type="hidden"
                value={props.value}
            />
    );
}

export const AppDynamicSelect = (props) => {

    const {
        options
    } = props

    const [ dynamicOptions, setOptions ] = useState({...options});
    const [ dynamicInputs, setInputs ] = useState({});

    const handleAddInput = (event) => {
        let selectBox = event.target
        const selectedOption = selectBox.options[selectBox.selectedIndex].id
        if(selectedOption !== ''){
            let input = dynamicOptions[selectedOption]
            let inputs = {...dynamicInputs}
            inputs[selectedOption] = input
            setInputs(inputs)

            delete dynamicOptions[selectedOption]
            selectBox.value = ''
        }
    }

    const handleInputChange = (event) => {
        let inputs = {...dynamicInputs}
        inputs[event.target.name].value = event.target.value
        setInputs(inputs)
    }

    const handleRemoveInput = (inputName) => {
        let inputs = {...dynamicInputs}
        delete inputs[inputName]; 
        setInputs(inputs)

        let option = props.options[inputName]
        let options = {...dynamicOptions}
        options[inputName] = option
        setOptions(options)
    }

    const renderInputs = () => {
        const inputs = {...dynamicInputs}
        let data = []
        for (const [key, input] of Object.entries(inputs)) {
            data.push(
                <AppDynamicInput 
                    label={input.label} 
                    name={key} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    value={input.value}
                    handleChange={handleInputChange}
                    handleRemove={handleRemoveInput}
                />
            )
        }
        return data
    }

    const renderSelectOptions = () => {
        let data = []
        for (const [key, option] of Object.entries(dynamicOptions)) {
            data.push(
                <option id={key}>
                    {option.label}
                </option>
            )
        }
        return data
    }

    return (
        <div className="form-dynamic-select">
            <div className="form-input">
                <label>{props.label}</label>
                <select onChange={handleAddInput}>
                    { renderSelectOptions(dynamicOptions) }
                </select>
            </div>
            { renderInputs() }
        </div>
        
    );
}


// Select list button options
// used to display a list of select options
const AppListSelect = (props) => {

    const {
        options,
        selectedOptions,
        handleSelectOptions
    } = props

    return (
        <div>
            {
                // return list of buttons to select
                options.map(p => {
                    let index = selectedOptions.findIndex(s => s === p) // check selected data
                    return <button key={p} 
                            className={index !== -1? // change style if index found
                                "app-button filter-button active" 
                                : 
                                "app-button filter-button"}
                            onClick={() => handleSelectOptions(p)}>
                        {p}
                    </button>
                })
            }
        </div>
    )
}

// select multiple list options
// used to select multiple options from a list
export const AppMultiSelect = (props) => {

    const {
        label,
        data,
        selectedOptions,
        handleMultiSelectChange
    } = props 

    // tracks the current selected button
    // used to switch bettween multiple select buttons
    const [selectedButton, setSelectedButton] = useState()

    // handle view options
    // used to display options for a given button
    const handleViewOptions = (buttonId) => {
        if(selectedButton === buttonId){ // id same as state
            setSelectedButton() // hide options 
        }else{
            setSelectedButton(buttonId) // show options
        }
    }

    return (
        <div className="form-input">
            <div className="title">
                <label>{label}</label>
            </div>
            <div className="buttons">
                {
                    // return list of buttons from given data
                    data.map(d => <button key={d.id}
                        className={selectedButton === d.id?
                            "app-button filter-button active"
                        :
                            "app-button filter-button"}
                        onClick={() => handleViewOptions(d.id)}>
                            {d.label}
                    </button>)
                }
            </div>
            <div className="options">
                {
                    // return selected button options
                    selectedButton ?
                    <AppListSelect 
                        selectedOptions={selectedOptions}
                        options={
                            // find the select buttons options
                            data.find(d => d.id === selectedButton).options
                        }
                        handleSelectOptions={handleMultiSelectChange}
                    /> : ''
                }
            </div>
        </div>
    )
}


export const AppDynamicInput = (props) => {
    
    return (
        <div className="form-input">
            <label>{props.label}</label>
            <div className="input-dynamic">
                <input 
                    name={props.name}
                    onChange={props.handleChange}
                    type={props.type}
                    value={props.value} 
                    placeholder={props.placeholder} 
                />
                <div className="remove-input" onClick={ () => props.handleRemove(props.name)}>
                    
                </div>
            </div>
            
        </div>
    );
}
