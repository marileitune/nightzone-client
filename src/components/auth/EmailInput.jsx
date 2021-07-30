import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { Button, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles} from '@material-ui/styles';
import {CssTextField, Subtitle, Brand} from '../../DefaultTheme'


//COMPONENT
class EmailInput extends Component {
    render() {
        const {onChange, onPreview, onNext, error, classes, email} = this.props


        return (
            <Grid container className="both-centered">
                <Brand variant="h1" style={{paddingBottom: '2%'}}> <Link to="/" style={{ textDecoration: 'inherit', color:'linear-gradient(90deg, #39A6A3 30%, #BF1363 90%)'}}>NIGHTZONE</Link></Brand>
                <Subtitle variant="h5" style={{paddingBottom: '2.5%'}}>What is your email address?</Subtitle>
                <CssTextField id="outlined-basic" label="Email" variant="outlined" type="email"  value={email} style={{paddingBottom: '2%'}} required onChange={onChange('email')}/>
                <Grid container spacing={24} direction="row" justifyContent='center' alignItems="center" style={{paddingBottom: '2%'}}>
                    <Button variant="outlined" className="CustomStrokeButton" style={{marginRight: '2%'}}onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                </Grid> 
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

 export default withStyles(makeStyles)(EmailInput)