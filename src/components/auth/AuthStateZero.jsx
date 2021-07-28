import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { Button, Typography, Grid } from '@material-ui/core';
import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import {spacing} from '@material-ui/system'
import MailOutlineIcon from '@material-ui/icons/MailOutline';


const useStyles = makeStyles((theme) => ({}));
const Brand = withStyles({
  root: {
    fontFamily:'Monoton',
    background: "-webkit-linear-gradient(45deg, #39A6A3 30%, #BF1363 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography);

const Subtitle = withStyles({
  root: {
    fontFamily:'Montserrat',
    background: "#DEEEEA",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography);

class AuthStateZero extends Component {
    
    render() {
        const {onFacebookResponse, onGoogleResponse, onNext, } = this.props
        return (
            <div className="both-centered" >
               <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">Sign in or sign up with</Subtitle>
                <Link to="/auth" style={{ textDecoration: 'none' }}><Button variant="contained" size="large" color="primary" onClick={onNext}><MailOutlineIcon/> EMAIL</Button></Link>
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <FacebookButton onFacebookResponse={onFacebookResponse} />
                    <GoogleButton onGoogleResponse={onGoogleResponse}/> 
                </Grid> 
            </div>
        )
    }
}

AuthStateZero.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(makeStyles)(AuthStateZero)