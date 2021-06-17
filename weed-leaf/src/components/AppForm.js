import React, { Component } from 'react';
import { AppTextEditor } from './AppTextEditor';

const ValidateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(email))
        return (true)
    return (false)
}

const AppSelect = (props) => {
    
    const renderOptions = () => {
        return props.options.map(option => {
            let selected = props.selectedValue == option.id? true : false
            return (
                <option id={option.id} selected={selected}>
                    {option.label}
                </option>
            )
        })
    }

    const handleOnChange = (event) => {
        if(props.handleOnChange){
            props.handleOnChange(event.target)
        }
    }
    
    return (
        <div className="form-input">
            <label>{props.label}</label>
            <select name={props.name} onChange={handleOnChange}>
                { renderOptions() }
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

class AppForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'formData': props.formData,
            'formError': ''
        }

        this.generateForm = this.generateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.submitForm = this.submitForm.bind(this);
    }

    generateForm(){
        let data = []
        for (const [key, input] of Object.entries(this.state['formData'])) {
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
            }else{
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
        let newState = this.state.formData;
        newState[event.target.name].value = event.target.value
        this.setState({
            'formData': newState
        });
    }

    async submitForm(event){
        event.preventDefault();
        let submitData = {};
        let formData = {...this.state.formData}, throwError = false;
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

        console.log(submitData)
        console.log(throwError)
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
            <form className="app-form" onSubmit={this.submitForm} method={this.props.method}>
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
