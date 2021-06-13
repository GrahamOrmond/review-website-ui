import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import AppCard from '../../components/AppCard';
import { AppForm, AppInput } from '../../components/AppForm';
import AppModal from "../../components/AppModal"

import { loginUser } from '../oauth/oauthSlice'
import { getUserInfo } from './accountSlice'

import './account.css'




const LoginExtra = () => {

    return (
        <div className="login-extra">
            <div className="login-info">
                <p>By continuing, you agree to our <Link to="/about/user-agreement">User Agreement</Link> and <Link to="/about/privacy-policy">Privacy Policy</Link>.</p>
            </div>
            <div className="login-info">
                <p><Link to="/account/register">Forgot your username or password?</Link></p>
                <p><Link to="/account/register">Sign Up Here</Link></p>
            </div>
        </div>
    );
}


const LoginForm = () => {

    const dispatch = useDispatch()

    const login = (formData) => {
        dispatch(loginUser(formData))
        .then(console.log("complete"))
    }

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
            method="POST"
            formData={loginForm}
            handleSubmit={login}
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
                    <LoginForm />
                    <LoginExtra />
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