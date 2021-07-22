import React, { Component } from 'react'
import {Link, withRouter} from  'react-router-dom';
import { Button } from '@material-ui/core';
import FacebookButton from './FacebookButton'
import axios from 'axios';
import GoogleButton from './GoogleButton';
import AuthStateZero from './AuthStateZero';
import PasswordInputSignIn from './PasswordInputSignIn';
import {API_URL} from '../config.js'
import EmailInput from './EmailInput'
import NameInput from './NameInput'
import PasswordInputSignUp from './PasswordInputSignUp'

/*
step == 1 // AuthStateZero
step == 2 // EmailInput
step == 3 // PasswordInputSignIn (when the email already exist in DB)
step == 4 // NameInput (when the email does not exist in DB)
step == 5 // PasswordInputSignUp 
*/

class Auth extends Component {
    state = {
        step: 1,
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        age: ''
    }
    
    prevStep = () => {
        const {step} = this.state
        this.setState({ step: step -1})
    }

    nextStep = () => {
        console.log('mariana')
        const {step} = this.state
        this.setState({ step: step +1})
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleAuth = async () => {
        try {
            const {email} = this.state
            const user = await axios.get(`${API_URL}/api/auth`, {email}, {withCredentials: true})
            if(user) {
                this.setState({step: 3})
            }
            else {
                this.setState({step: 4})
            }
        }   
        catch (err){
            console.log('Auth failed', err)
        }
    }

    handleLogin = async () => {
        try {
            const {email, password} = this.state
            let myUser = { 
                email: email,
                password: password
            }
            const response = await axios.post(`${API_URL}/api/signin`, myUser, {withCredentials: true})
            console.log(response)
            const {onSignIn} = this.props
            onSignIn(response.data)
            this.props.history.push('/')
        }   
        catch (err){
            console.log('Auth failed', err)
        }
    }

    render() {
        const {onFacebookResponse, onGoogleResponse} = this.props
        const { step } = this.state;
        const { email, firstName, lastName, password, confirmPassword, age } = this.state;
        const values = { email, firstName, lastName, password, confirmPassword, age }
        
        {
            switch (step) {
                case 1: 
                    return (
                        <AuthStateZero onFacebookResponse={onFacebookResponse} onGoogleResponse={onGoogleResponse} onNext={this.nextStep}/>
                    )
                case 2: 
                    return (
                        <EmailInput onNext={this.handleAuth} onPreview={this.prevStep} onChange={this.handleChange('email')}/>
                    )
                case 3: 
                    return (
                        <PasswordInputSignIn onLogin={this.handleLogin} onPreview={this.prevStep} onChange={this.handleChange('password')}/>
                    )
                case 4:
                    return (
                        <NameInput />
                    )
                case 5:
                    return (
                        <PasswordInputSignUp />
                    )
                 default: 
            }
        }
    
    }
}

export default withRouter(Auth);
