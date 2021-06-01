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



class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'loginData': {
                'username': '',
                'password': ''
            }
        }

        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(event){
        console.log(event.target.name)
        console.log(event.target.value)

        let newState = this.state.loginData;
        console.log(newState)
        newState[event.target.name] = event.target.value
        this.setState({
            'loginData': newState
        });

        console.log(this.state)
    }


    render () {
        return (
            <AppForm 
                title="Login"
                submitTitle="Log In"
            >
                <AppInput 
                    label="Email" 
                    name="username"
                    type="text" 
                    placeholder="" 
                    value={this.state.loginData.username}
                    handleChange={this.updateInput}
                />
                <AppInput 
                    label="Password" 
                    name="password"
                    type="password" 
                    placeholder="" 
                    value={this.state.loginData.password}
                    handleChange={this.updateInput}
                />
            </AppForm>
        );
    }
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