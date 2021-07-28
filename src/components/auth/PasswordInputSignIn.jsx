import React, { Component } from 'react'
import {Link, withRouter} from  'react-router-dom';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles } from '@material-ui/styles';
import {CssTextField, Subtitle, Brand} from '../../DefaultTheme'
// STYLES


  
  //COMPONENT
class PasswordInputSignIn extends Component {
    render() {
        const {onLogin, onPreview, onChange, error} = this.props
        return (
            <div className="both-centered">
                <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">What is your password?</Subtitle>
                <CssTextField id="outlined-basic" className="CustomInput"label="Password" variant="outlined" type="password" required onChange={onChange('password')} InputLabelProps={{style: { color: '#DEEEEA' },}} />
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onLogin}>NEXT</Button>
                </Grid>                 
                {
                    error && <Alert severity="error">{error}</Alert>
                }

            </div>
        )
    }
}

export default withRouter(PasswordInputSignIn)