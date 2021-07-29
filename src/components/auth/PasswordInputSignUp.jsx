import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { Typography, TextField, Checkbox, Button, FormControlLabel, Grid,FormHelperText} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField, Subtitle, Brand, CustomCheckbox} from '../../DefaultTheme'

class PasswordInputSignUp extends Component {

    render() {
        
        const {onRegister, onPreview, onChange, onCheck, error} = this.props
        return (
            <div className="both-centered">
                <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">Choose a password </Subtitle>
                <FormHelperText style={{color: '#DEEEEA'}}>Must have 6-16 characters in length and at least 1 number and 1 special character.</FormHelperText>
                <CssTextField id="outlined-basic" label="Password" variant="outlined" type="password" required onChange={onChange('password')}/>
                <CssTextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" required onChange={onChange('confirmPassword')}/>
               
                <FormControlLabel control={<CustomCheckbox name="age" required onChange={onCheck}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>I am older than 18.</Typography>}/>
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onRegister}>SIGN UP</Button>
                </Grid> 
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default PasswordInputSignUp;