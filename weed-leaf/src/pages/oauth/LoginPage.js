import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { AppInput } from '../../components/AppForm';
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

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleInputChange = (e) => {
        const newState = {...formData}
        newState[e.target.name] = e.target.value
        setFormData(newState)
    }

    const handleLogin = () => {
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

    return (
        <div>
            <div className="form-header">
                <h4>Create Post</h4>
            </div>

            <div className="form-content">
                <AppInput 
                    name="email"
                    label="Email" 
                    type="text"
                    placeholder=''
                    value={formData.email}
                    handleChange={handleInputChange}
                />

                <AppInput 
                    name="password"
                    label="Password" 
                    type="password"
                    placeholder=''
                    value={formData.password}
                    handleChange={handleInputChange}
                />
            </div>

            <div className="form-footer">
                <button type="submit" 
                    className="button-blue" 
                    onClick={handleLogin}>
                    Login
                </button>
            </div>

        </div>
    );
}

export const LoginPage = () => {

    return (
        <div className="app-content">
            <AppModal>
                <LoginForm />
                <LoginExtra />
            </AppModal>
        </div>
    );
}
