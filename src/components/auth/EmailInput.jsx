import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles } from '@material-ui/styles';
import {CssTextField} from '../../DefaultTheme'
// STYLES

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





//COMPONENT
class EmailInput extends Component {
    render() {
        const {onChange, onPreview, onNext, error, classes} = this.props


        return (
            <div className="both-centered">
                <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5">What is your email address?</Subtitle>
                <CssTextField id="outlined-basic" color="#DEEEEA" label="Email" variant="outlined" type="email" required onChange={onChange('email')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" >
                    <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                </Grid> 

                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

 export default withStyles(makeStyles)(EmailInput)