import React, { Component, useState } from 'react';
import { AppTextEditor } from './AppTextEditor';

const ValidateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(email))
        return (true)
    return (false)
}

const renderSelectOptions = (options, selectedValue) => {
    
    let data = []
    for (const [key, option] of Object.entries(options)) {
        let selected = selectedValue == key? true : false
        data.push(
            <option id={key} selected={selected}>
                {option.label}
            </option>
        )
    }
    return data
}

export const AppFileInput = (props) => {

    let files = [

    ]

    return (
        <div className="form-input">
            <label>{props.label}</label>
            <input 
                name={props.name}
                onChange={(e) => props.handleOnChange(e)}
                type="file"
            />
            <label className="input-error">{props.error}</label>
        </div>
    );
}

export const AppSelect = (props) => {
    
    return (
        <div className="form-input">
            <label>{props.label}</label>
            <select name={props.name} onChange={(e) => props.handleOnChange(e)}>
                { renderSelectOptions(props.options, props.selectedValue) }
            </select>
        </div>
    );
}

export const AppInput = (props) => {
    
    return (
        <div className="form-input">
            <label>{props.label}</label>
            <input 
                name={props.name}
                onChange={props.handleChange}
                type={props.type}
                value={props.value} 
                placeholder={props.placeholder} 
            />
            <label className="input-error">{props.error}</label>
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

    const [ dynamicOptions, setOptions ] = useState({...props.options});
    const [ dynamicInputs, setInputs ] = useState({});

    const handleAddInput = (event) => {
        let selectBox = event.target
        const selectedOption = selectBox.options[selectBox.selectedIndex].id
        if(selectedOption != ''){
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

    return (
        <div>
            <div className="form-input">
                <label>{props.label}</label>
                <select onChange={handleAddInput}>
                    { renderSelectOptions(dynamicOptions, '') }
                </select>
            </div>
            { renderInputs() }
        </div>
        
    );
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

export const AppForm = (props) => {
    const formData = props.formData

    const [ formErrors, setFormErrors ] = useState([])

    // handles file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        e.target.value = ""

        let newState = {...formData};
        newState[e.target.name].files.push(selectedFile)
        props.updateFormData(newState)
    }

    // handles text input change
    const handleInputChange = (e) => {
        let newState = {...formData};
        newState[e.target.name].value = e.target.value
        props.updateFormData(newState)
    }

    // handles select box change
    const handleSelectChange = (e) => {
        let newState = {...formData};
        const selectedOption = e.target.options[e.target.selectedIndex].id
        newState[e.target.name].value = selectedOption
        props.updateFormData(newState)
        if(typeof formData[e.target.name].handleOnChange === 'function'){
            formData[e.target.name].handleOnChange(formData, selectedOption)
        }
    }

    // generates the form inputs
    const generateForm = (formData) => {
        let data = []
        for (const [key, input] of Object.entries(formData)) {

            switch (input.type) {
                case 'select':
                    data.push(<AppSelect 
                        name={key}
                        selectedValue={input.value}
                        options={input.options}
                        handleOnChange={handleSelectChange}
                    />);
                    break;
                case 'textEditor':
                    data.push(<AppTextEditor name={key}/>)
                    break;
                case 'hidden':
                    data.push(<AppHiddenInput 
                        name={key} 
                        value={input.value}
                    />)
                    break;
                case 'properties':
                    data.push(<AppDynamicSelect
                        label={input.label}
                        options={input.options}
                    />)
                    break;
                case 'file':
                    data.push(<AppFileInput
                        label={input.label} 
                        handleOnChange={handleFileChange}
                        files={input.files}
                        name={key} 
                    />)
                    break;
                default:
                    data.push(<AppInput 
                        label={input.label} 
                        name={key} 
                        type={input.type} 
                        placeholder={input.placeholder} 
                        value={input.value}
                        handleChange={handleInputChange}
                        error={input.error}
                    />);
            }
        }
        return data;
    }

    // generates form sumbit buttons
    const generateSubmitButtons = () => {
        let buttons = []
        for (const [key, button] of Object.entries(props.submitButtons)) {
            buttons.push(
                <button type="submit" className="button-blue" name={key} value={key}>
                   {button.label}
                </button>
            )
        }
        return buttons;
    }

    // handle creating data for form submit
    const submitForm = async (event) => {
        event.preventDefault();
        
        // create form data
        let data = {...formData}, throwError = false;
        let submitData = {};
        for (let i = 0 ; i < event.target.elements.length; i ++){
            let element = event.target.elements[i];
            // skip inputs
            if(element.nodeName.toLowerCase() == "button" || element.name === ''){
                continue
            }
                
            // select input
            if(element.nodeName.toLowerCase() == "select"){
                const selectedOption = element.options[element.selectedIndex]
                if(selectedOption)
                    submitData[element.name] = selectedOption.id;
                continue
            }

            // text editor input1
            if(element.hidden && element.value == "textEditor"){
                let content = document.getElementById("edit_content");
                submitData[element.name] = content.innerHTML
            }else{ // all other inputs
                submitData[element.name] = element.value;
            }

            // not in form data
            if(!data[element.name])
                continue 

            // input required
            if(data[element.name].required 
                && !submitData[element.name])
            {
                throwError = true
                data[element.name].error = `${data[element.name].label} is required`
                continue
            }
            // email inputs
            else if(data[element.name].type == "email"
                && !ValidateEmail(element.value))
            {
                throwError = true
                data[element.name].error = 'Invalid email address'
                continue
            }
            // if reached then theirs no error
            data[element.name].error = `` 
        }
        if(throwError){ // return to show any errors
            props.updateFormData(data)
            return
        }
            
        // try sumbiting the data
        const formAction = event.nativeEvent.submitter.name;
        const error = props.submitButtons[formAction]
            .handleSubmit(submitData)
        let errorsList = [error]
        setFormErrors(errorsList)
    }
    
    return (
        <form id={props.id}
            className="app-form" 
            onSubmit={(e) => submitForm(e)} 
            method={props.method}
        >
            <div className="form-header">
                <h4>{props.title}</h4>
            </div>

            <div className="form-content">
                { generateForm(formData) }
                <div className="form-error">
                    {formErrors}
                </div>
            </div>
            <div className="form-footer">
               { generateSubmitButtons() }
            </div>
        </form>
    );
}
