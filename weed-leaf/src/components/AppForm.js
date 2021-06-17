import React, { Component } from 'react';

const ValidateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(email))
        return (true)
    return (false)
}

class AppSelect extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <div className="form-input">
                <label>{this.props.label}</label>
                <select></select>
            </div>
        );
    }
}

class AppInput extends Component {

    constructor(props) {
        super(props);

        this.handleChange = props.handleChange.bind(this);
    }
    
    render () {
        
        return (
            <div className="form-input">
                <label>{this.props.label}</label>
                <input 
                    name={this.props.name}
                    onChange={this.handleChange}
                    type={this.props.type}
                    value={this.props.value} 
                    placeholder={this.props.placeholder} 
                />
                <label className="input-error">{this.props.error}</label>
            </div>
        );
    }
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

        this.handleSubmit =  this.props.handleSubmit.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    generateForm(){
        let data = []
        for (const [key, input] of Object.entries(this.state['formData'])) {
            if(input['type'] == 'select'){
                continue;
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

        for (let i = 0 ; i < event.target.elements.length; i ++){
            let element = event.target.elements[i];
            if(element.nodeName.toLowerCase() == "button")
                continue

            submitData[element.name] = element.value;
            
            if(formData[element.name].required && !element.value)
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

        const error = await this.handleSubmit(submitData);
        console.log(error)
        this.setState({
            'formError': error
        })

    }

    
    render () {
        
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
                   <button type="submit"
                        className="button-blue">
                       {this.props.submitTitle}
                       </button>
                </div>
            </form>
        );
    }
}
export { AppForm, AppInput, AppSelect };
