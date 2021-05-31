import React, { Component } from 'react';
import AppCard from '../../components/AppCard';
import AppForm from '../../components/AppForm';
import AppModal from "../../components/AppModal"

import './account.css'

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.renderLoginContent = this.renderLoginContent.bind(this);
    }

    renderLoginContent(){
        return (
            <div>
               <AppCard >
                    <div className="login-info">
                        <h4>Login</h4>
                    </div>
                    <AppForm />
                    <div className="login-info">
                        <p>Forgot your username or password?</p>
                        <p>Sign Up Here</p>
                    </div>
                    <div className="login-info">
                        <p>By continuing, you agree to our User Agreement and Privacy Policy.</p>
                    </div>
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