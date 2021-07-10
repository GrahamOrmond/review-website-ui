import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { AppForm } from '../../components/AppForm';
import { AppModal } from "../../components/AppModal"

import { fetchCurrentUser, loginUser } from './oauthSlice'

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
        dispatch(loginUser(formData))
        .then((res) => {
            const status = res.meta.requestStatus
            if(status === "rejected")
                return "Invalid Login"
            else if (status === "fulfilled"){
                dispatch(fetchCurrentUser(""))
                .then(history.push('/'))
            }
            else
                return "Internal Error"
        })
    }

    const updateFormData = (newState) => {
        setFormData(newState)
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

    const submitButtons = {
        "post": {
            label: "Login",
            handleSubmit: handleLogin
        }
    }
    const [ formData, setFormData ] = useState(loginForm)


    return (
        <AppForm 
            title="Login"
            submitTitle="Log In"
            method="POST"
            formData={formData}
            submitButtons={submitButtons}
            updateFormData={updateFormData}
        />
    );
}

export const LoginPage = (props) => {

    return (
        <div className="app-content">
            <AppModal>
                <LoginForm />
                <LoginExtra />
            </AppModal>
        </div>
    );
}
