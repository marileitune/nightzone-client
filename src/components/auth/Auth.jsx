import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import axios from 'axios';
import AuthStateZero from './AuthStateZero';
import PasswordInputSignIn from './PasswordInputSignIn';
import {API_URL} from '../../config.js'
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
        age: false,
        error: null
    }
    
    prevStep = () => {
        const {step} = this.state
        //if we are in the step 4 (nameInput) and we want to back, the screen that need to appears is the step 2(email) and not 3 (passwordInputSignIn)
        if (step === 4) {
            this.setState({ step: step -2})
            return
        }
        this.setState({ step: step -1})
    }

    nextStep = () => {
        console.log('mariana')
        const {step} = this.state
        this.setState({ step: step +1})
    }

    //here we are saving the things typed by the user in the state, to grab the information later on handleLogin or handleRegister
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleCheck = () => {
        const {age} = this.state
        if (age === true) {
            this.setState({age: false})
        } else {
            this.setState({age: true})
        }
    } 

    //here we will check if the email typed by the user already exists in DB or not. If yes, go to step 3 (PasswordInputSignIn). If not, go to step 4(NameInput)
    handleAuth = async () => {
        try {
            const {email} = this.state
            const user = await axios.post(`${API_URL}/api/auth`, {email}, {withCredentials: true})          
            if(user.data) {
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
            //if inside the response we have an error, grab the error from backend
            if (response.data.errorMessage) {
                await this.setState({...this.state, error: response.data.errorMessage})
                 console.log(this.state)
                 return
             }
            
            //this is for changing the state of the user (from null to the response.data):
            const {onAuth} = this.props
            onAuth(response.data)
            this.props.history.push('/events')
        }   
        catch (err){
            console.log('Log in failed', err)
        }
    }

    handleRegister = async () => {
        try {
            const {email, firstName, lastName, password, confirmPassword, age} = this.state
            if (age === false) {
                this.setState({
                    ...this.state, error: "Underage"
                })
                return
            }
            let newUser = { 
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmPassword: confirmPassword
            }
            const response = await axios.post(`${API_URL}/api/signup`, newUser, {withCredentials: true})
            console.log(response.data.errorMessage)
            //if inside the response we have an error, grab the error from backend
            if (response.data.errorMessage) {
               await this.setState({...this.state, error: response.data.errorMessage})
                console.log(this.state)
                return
            }
            //this is for changing the state of the user (from null to the response.data):
            const {onAuth} = this.props
            onAuth(response.data)
            this.props.history.push('/events')
        }
        catch (err) {
            console.log('Register failed', err)
        }
    }

    render() {
        const {onFacebookResponse, onGoogleResponse} = this.props
        const { step } = this.state;
        const {error} = this.state
        switch (step) {
            case 1: 
                return (
                    <AuthStateZero onFacebookResponse={onFacebookResponse} onGoogleResponse={onGoogleResponse} onNext={this.nextStep} />
                )
            case 2: 
                return (
                    <EmailInput onNext={this.handleAuth} onPreview={this.prevStep} onChange={this.handleChange} error={error}/>
                )
            case 3: 
                return (
                    <PasswordInputSignIn onLogin={this.handleLogin} onPreview={this.prevStep} onChange={this.handleChange} error={error}/>
                )
                case 4:
                    return (
                        <NameInput onNext={this.nextStep} onPreview={this.prevStep} onChange={this.handleChange} error={error}/>
                    )
            case 5:
                return (
                    <PasswordInputSignUp onRegister={this.handleRegister} onPreview={this.prevStep} onCheck={this.handleCheck} onChange={this.handleChange} error={error}/>
                )
            default: 
        }
    
    }
}

export default withRouter(Auth);
