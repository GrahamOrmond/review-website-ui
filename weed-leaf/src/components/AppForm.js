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

const AppSelect = (props) => {

    const handleOnChange = (event) => {
        if(props.handleOnChange){
            props.handleOnChange(event.target)
        }
    }
    
    return (
        <div className="form-input">
            <label>{props.label}</label>
            <select name={props.name} onChange={handleOnChange}>
                { renderSelectOptions(props.options, props.selectedValue) }
            </select>
        </div>
    );
}

const AppInput = (props) => {
    
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

const AppHidddenInput = (props) => {
    
    return (
        <input 
                name={props.name}
                type="hidden"
                value={props.value}
            />
    );
}

const AppDynamicSelect = (props) => {

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

const AppDynamicInput = (props) => {
    
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

class AppForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'formError': ''
        }

        this.generateForm = this.generateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.submitForm = this.submitForm.bind(this);
    }

    generateForm(){
        let data = []
        for (const [key, input] of Object.entries(this.props.formData)) {
            if(input.type == 'select'){
                data.push(<AppSelect 
                    name={key}
                    selectedValue={input.value}
                    options={input.options}
                    handleOnChange={input.handleOnChange}
                />);
            }else if(input.type == "textEditor")
            {
                data.push(<AppTextEditor name={key}/>)
            }else if (input.type == "hidden"){
                data.push(<AppHidddenInput 
                    name={key} 
                    value={input.value}
                />)
            }else if (input.type == "properties") {
                data.push(<AppDynamicSelect
                    label={input.label}
                    options={input.options}
                    handleOnChange={this.handleDynamicSelect}
                />)
            } else {
                data.push(<AppInput 
                    label={input.label} 
                    name={key} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    value={input.value}
                    handleChange={this.handleChange}
                    error={input.error}
                />);
            }
        }
        return data;
    }

    handleChange(event){
        let newState = this.props.formData;
        newState[event.target.name].value = event.target.value
        this.setState({
            'formData': newState
        });
    }

    async submitForm(event){
        event.preventDefault();
        let submitData = {};
        let formData = {...this.props.formData}, throwError = false;
        const formAction = event.nativeEvent.submitter.name;
        for (let i = 0 ; i < event.target.elements.length; i ++){
            let element = event.target.elements[i];
            if(element.nodeName.toLowerCase() == "button")
                continue
            if(element.nodeName.toLowerCase() == "select"){
                const selectedOption = element.options[element.selectedIndex].id
                submitData[element.name] = selectedOption;
                continue
            }
            
            if(element.hidden && element.value == "textEditor"){
                let content = document.getElementById("edit_content");
                submitData[element.name] = content.innerHTML
            }else{
                submitData[element.name] = element.value;
            }

            if(!formData[element.name])
                continue 
            
            if(formData[element.name].required && !submitData[element.name])
            {
                throwError = true
                formData[element.name].error = `${formData[element.name].label} is required`
                continue
            }
            else if(formData[element.name].type == "email"
                && !ValidateEmail(element.value))
            {
                throwError = true
                formData[element.name].error = 'Invalid email address'
                continue
            }
            formData[element.name].error = ``
        }

        this.setState({
            'formData': formData
        })
        
        if(throwError)
            return

        const error = this.props.submitButtons[formAction]
            .handleSubmit(submitData)
        this.setState({
            'formError': error
        })

    }
    

    
    render () {

        const submitButtons = () => {
            let buttons = []
            for (const [key, button] of Object.entries(this.props.submitButtons)) {
                buttons.push(
                    <button type="submit" className="button-blue" name={key} value={key}>
                       {button.label}
                    </button>
                )
            }
            return buttons;
        }
        
        return (
            <form id={this.props.id}
                className="app-form" 
                onSubmit={this.submitForm} 
                method={this.props.method}
            >
                <div className="form-header">
                    <h4>{this.props.title}</h4>
                </div>

                <div className="form-content">
                    { this.generateForm() }
                    <div className="form-error">
                        {this.state.formError}
                    </div>
                </div>
                <div className="form-footer">
                   {submitButtons()}
                </div>
            </form>
        );
    }
}
export { AppForm };
