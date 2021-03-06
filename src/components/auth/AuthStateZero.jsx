import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Subtitle, Brand} from '../../DefaultTheme'


class AuthStateZero extends Component {
    
    render() {
        const {onFacebookResponse, onGoogleResponse, onNext, } = this.props
        return (
            <Grid className="both-centered" >
               <Brand variant="h1" style={{paddingBottom: '2%'}}> <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5" style={{paddingBottom: '2.5%'}}>Sign in or sign up with</Subtitle>
                <Link to="/auth" style={{ textDecoration: 'none', paddingBottom: '2%'}}><Button className="CustomButton" variant="contained" size="large" onClick={onNext} ><MailOutlineIcon/> EMAIL</Button></Link>
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <FacebookButton onFacebookResponse={onFacebookResponse}/>
                    <GoogleButton onGoogleResponse={onGoogleResponse}/> 
                </Grid> 
            </Grid>
        )
    }
}

AuthStateZero.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(makeStyles)(AuthStateZero)