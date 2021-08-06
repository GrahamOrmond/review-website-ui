import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { AppModal } from "../../components/AppModal"
import { fetchCurrentUser, loginUser, registerUser } from './oauthSlice';

import './oauth.css'
import { AppInput } from '../../components/AppForm';

// extra info for the registration page
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

// handle registering new users
const RegisterForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    // set form data
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    // handle form data input change
    const handleInputChange = (e) => {
        const newState = {...formData}
        newState[e.target.name] = e.target.value
        setFormData(newState)
    }

    // handle registering the user
    const handleRegisterUser = () => {
        dispatch(registerUser(formData))
        .then((res) => {
            const status = res.meta.requestStatus
            if(status === "rejected") // failed to register
                return res.payload.message
            else if (status === "fulfilled") // success
            {
                // log the user in
                let loginData = {
                    'email': formData.email,
                    'password': formData.password
                }
                dispatch(loginUser(loginData))
                .then((res) => {
                    dispatch(fetchCurrentUser(""))
                    .then(history.push('/'))
                })
            }
            else
                return "Internal Error"
        })
    }

    // return form data
    return (
        <div>
            <div className="form-header">
                <h4>Sign Up</h4>
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
                    name="username"
                    label="Username" 
                    type="text"
                    placeholder=''
                    value={formData.username}
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

                <AppInput 
                    name="confirmPassword"
                    label="Confirm Password" 
                    type="password"
                    placeholder=''
                    value={formData.confirmPassword}
                    handleChange={handleInputChange}
                />
            </div>

            <div className="form-footer">
                <button type="submit" 
                    className="button-blue" 
                    onClick={handleRegisterUser}>
                    Register
                </button>
            </div>

        </div>
    );
}

export const RegisterPage = () => {

    return (
        <div className="app-content">
            <AppModal>
                <RegisterForm/>
                <RegisterExtra/>
            </AppModal>
        </div>
    );
}
