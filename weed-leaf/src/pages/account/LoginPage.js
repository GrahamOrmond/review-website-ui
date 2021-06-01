import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppCard from '../../components/AppCard';
import { AppForm, AppInput } from '../../components/AppForm';
import AppModal from "../../components/AppModal"

import './account.css'

const loginExtra = () => {

    return (
        <div className="login-extra">
            <div className="login-info">
                <p>By continuing, you agree to our <Link to="/">User Agreement</Link> and <Link to="/">Privacy Policy</Link>.</p>
            </div>
            <div className="login-info">
                <p><Link to="/account/register">Forgot your username or password?</Link></p>
                <p><Link to="/account/register">Sign Up Here</Link></p>
            </div>
        </div>
    );
}


const loginForm = () => {

    let loginForm = {
        'email': {
            'label': 'Email',
            'type': 'text',
            'placehoder': '',
            'value': ''
        },
        'password': {
            'label': 'Password',
            'type': 'password',
            'placehoder': '',
            'value': ''
        }
    }

    return (
        <AppForm 
            title="Login"
            submitTitle="Log In"
            formData={loginForm}
        />
    );
}

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.renderLoginContent = this.renderLoginContent.bind(this);
    }

    renderLoginContent(){
        return (
            <div>
               <AppCard >
                    { loginForm() }
                    { loginExtra() }
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
export  { LoginPage };