import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import AppCard from '../../components/AppCard';
import { AppForm, AppInput } from '../../components/AppForm';
import AppModal from "../../components/AppModal"

import { loginUser } from './oauthSlice'
import { fetchCurrentUserInfo } from '../users/usersSlice'

import './oauth.css'

const LoginExtra = () => {

    return (
        <div className="login-extra">
            <div className="login-info">
                <p>By continuing, you agree to our <Link to="/about/user-agreement">User Agreement</Link> and <Link to="/about/privacy-policy">Privacy Policy</Link>.</p>
            </div>
            <div className="login-info">
                <p><Link to="/register">Forgot your username or password?</Link></p>
                <p><Link to="/register">Sign Up Here</Link></p>
            </div>
        </div>
    );
}


const LoginForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = (formData) => {
        return dispatch(loginUser(formData))
        .then((res) => {
            const status = res.meta.requestStatus
            if(status == "rejected")
                return "Invalid Login"
            else if (status == "fulfilled")
                dispatch(fetchCurrentUserInfo(""))
                .then(history.push('/'))
            else
                return "Internal Error"
        })
    }

    let loginForm = {
        'email': {
            'label': 'Email',
            'type': 'email',
            'placehoder': '',
            'required': true,
            'value': ''
        },
        'password': {
            'label': 'Password',
            'type': 'password',
            'placehoder': '',
            'required': true,
            'value': ''
        }
    }

    return (
        <AppForm 
            title="Login"
            submitTitle="Log In"
            method="POST"
            formData={loginForm}
            handleSubmit={handleLogin}
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