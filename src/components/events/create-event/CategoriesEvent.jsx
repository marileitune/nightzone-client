import React, { Component } from 'react'
import { Checkbox, Button, FormControlLabel, Grid, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {withRouter} from  'react-router-dom';
import {CssTextField, Subtitle, Brand, CustomCheckbox} from '../../../DefaultTheme'

class CategoriesEvent extends Component {
    render() {
        const {onPreview, onCreate, onCheck, error, categories} = this.props
        return (
            <Grid container className="both-centered">
                <Grid>
                    <Subtitle variant="h5">How would you classify your party? (max 3 categories)</Subtitle>
                </Grid>
                <Grid container spacing={5} direction="row">
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}  direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("houseParty")} onChange={() => onCheck('houseParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>House party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("outdoorParty")} onChange={() => onCheck('outdoorParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Outdoor party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("music")} onChange={() => onCheck('music')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Music</Typography>}/>   
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories"  checked={categories.includes("karaoke")} onChange={() => onCheck('karaoke')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Karaoke</Typography>}/> 
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("gameParty")} onChange={() => onCheck('gameParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Game party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}  direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("drinks")} onChange={() => onCheck('drinks')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Drinks</Typography>}/>    
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("costumeParty")} onChange={() => onCheck('costumeParty')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Costume party</Typography>}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} direction="column">
                        <FormControlLabel control={<CustomCheckbox name="categories" checked={categories.includes("swimingPool")} onChange={() => onCheck('swimmingPool')}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>Swimming pool</Typography>}/> 
                    </Grid>
                </Grid>
                {/* buttons */}
                <Grid container justify="center" alignItems="center" >
                    <Button variant="outlined" className="CustomStrokeButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onCreate}>NEXT</Button>
                </Grid> 
                {
                    error && <Alert severity="error">{error}</Alert>
                }  
            </Grid>
        )
    }
}

export default withRouter(CategoriesEvent);