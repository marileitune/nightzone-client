import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Checkbox, Button, FormControlLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField} from '../../DefaultTheme'

class PasswordInputSignUp extends Component {

    render() {
        
        const {onRegister, onPreview, onChange, onCheck, error} = this.props
        return (
            <div className="both-centered">
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>Choose a password with 6-16 characters in length and at least 1 number and 1 special character.</p>
                
                <CssTextField id="outlined-basic" label="Password" variant="outlined" type="password" required onChange={onChange('password')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <CssTextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" required onChange={onChange('confirmPassword')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <FormControlLabel control={<Checkbox name="age" required onChange={onCheck}/>}label="I am older than 18."/>
                <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                <Button variant="contained" className="CustomButton" onClick={onRegister}>SIGN UP</Button>

                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default PasswordInputSignUp;