import React, { Component } from 'react';

class AppSelect extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <div class="form-input">
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
            <div class="form-input">
                <label>{this.props.label}</label>
                <input 
                    name={this.props.name}
                    onChange={this.handleChange}
                    type={this.props.type}
                    value={this.props.value} 
                    placeholder={this.props.placeholder} 
                />
            </div>
        );
    }
}

class AppForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'formData': props.formData
        }

        this.generateForm = this.generateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    
    render () {
        
        return (
            <div className="app-form">
                <div className="form-header">
                    <h4>{this.props.title}</h4>
                </div>

                <div className="form-content">
                    { this.generateForm() }
                </div>
                <div className="form-footer">
                   <button className="button-blue">{this.props.submitTitle}</button>
                </div>
            </div>
        );
    }
}
export { AppForm, AppInput, AppSelect };
