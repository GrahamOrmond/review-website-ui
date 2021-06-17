import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import AppCard from '../../components/AppCard';
import { AppForm } from '../../components/AppForm';
import AppModal from "../../components/AppModal"
import { loginUser, registerUser } from './oauthSlice';

import './oauth.css'
import { fetchCurrentUserInfo } from '../users/usersSlice';

const RegisterExtra = () => {

    return (
        <div className="login-extra">
            <div className="login-info">
                <p>By continuing, you agree to our <Link to="/">User Agreement</Link> and <Link to="/">Privacy Policy</Link>.</p>
            </div>
            <div className="login-info">
                <p>Already have an account? <Link to="/login">Sign In Here</Link>.</p>
            </div>
        </div>
    );
}


const RegisterForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const register = (formData) => {
        dispatch(registerUser(formData))
        .then((res) => {
            const status = res.meta.requestStatus
            console.log(res)
            if(status == "rejected")
                return res.payload.message
            else if (status == "fulfilled")
            {
                let loginData = {
                    'email': formData.email,
                    'password': formData.password
                }
                dispatch(loginUser(loginData))
                .then((res) => {
                    dispatch(fetchCurrentUserInfo(""))
                    .then(history.push('/'))
                })
            }
            else
                return "Internal Error"
        })
    }

    let registerForm = {
        'email': {
            'label': 'Email',
            'type': 'email',
            'placehoder': '',
            'required': true,
            'value': ''
        },
        'username': {
            'label': 'Username',
            'type': 'text',
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
        },
        'confirmPassword': {
            'label': 'Confirm Password',
            'type': 'password',
            'placehoder': '',
            'required': true,
            'value': ''
        }
    }

    const submitButtons = {
        "post": {
            label: "Register",
            handleSubmit: register
        }
    }

    return (
        <AppForm 
            title="Sign Up"
            submitTitle="Sign Up"
            method="POST"
            formData={registerForm}
            submitButtons={submitButtons}
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
                    <RegisterForm/>
                    <RegisterExtra/>
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
