import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppCard from '../../components/AppCard';
import { AppForm, AppInput } from '../../components/AppForm';
import AppModal from "../../components/AppModal"

import './account.css'

const registerExtra = () => {

    return (
        <div className="login-extra">
            <div className="login-info">
                <p>By continuing, you agree to our <Link to="/">User Agreement</Link> and <Link to="/">Privacy Policy</Link>.</p>
            </div>
            <div className="login-info">
                <p>Already have an account? <Link to="/account/login">Sign In Here</Link>.</p>
            </div>
        </div>
    );
}


const registerForm = () => {

    let loginForm = {
        'email': {
            'label': 'Email',
            'type': 'text',
            'placehoder': '',
            'value': ''
        },
        'username': {
            'label': 'Username',
            'type': 'text',
            'placehoder': '',
            'value': ''
        },
        'password': {
            'label': 'Password',
            'type': 'password',
            'placehoder': '',
            'value': ''
        },
        'confirmPassword': {
            'label': 'Confirm Password',
            'type': 'password',
            'placehoder': '',
            'value': ''
        }
    }

    return (
        <AppForm 
            title="Sign Up"
            submitTitle="Sign Up"
            formData={loginForm}
        />
    );
}

class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.renderLoginContent = this.renderLoginContent.bind(this);
    }

    renderLoginContent(){
        return (
            <div>
               <AppCard >
                    { registerForm() }
                    { registerExtra() }
                </AppCard> 
            </div>
        );
    }
    
    render () {
        
        return (
            <div className="app-content">
                <AppModal renderModal={this.renderLoginContent}/>
            </div>
        );
    }
}
export  { RegisterPage };
