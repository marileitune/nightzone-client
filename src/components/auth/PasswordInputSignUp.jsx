import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Checkbox, Button, FormControlLabel } from '@material-ui/core';

class PasswordInputSignUp extends Component {

    render() {
        const {onRegister, onPreview, onChange, onCheck} = this.props
        return (
            <div>
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>Choose a password with 6-16 characters in length and at least 1 number and 1 special character.</p>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" required onChange={onChange('password')}/>
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" required onChange={onChange('confirmPassword')}/>
                <FormControlLabel control={<Checkbox name="age" required onChange={onCheck}/>}label="I am older than 18."/>
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary"onClick={onRegister}>SIGN UP</Button>
     
            </div>
        )
    }
}

export default PasswordInputSignUp;