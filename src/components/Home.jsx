import React, { Component } from 'react'
import { Typography, Paper, Container, ThemeProvider, Grid } from '@material-ui/core';
import {createTheme, withStyles} from '@material-ui/core/styles'
import { Subtitle } from '../DefaultTheme';



const styles = theme => ({
    bold: {
        fontWeight: 700,
    },
    spacing: {
        letterSpacing: 3,
    },

  });


class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
                <Grid container wrap="nowrap" spacing={2} direction="column">
                   
                        {/* <video  autoPlay loop muted id="video-container">
                            <source src="https://res.cloudinary.com/dplgnsjzm/video/upload/v1626958308/nightzone-backend/video/video_gw4ydm.mp4" type='video/mp4' />
                        </video>
          
                       <Grid style={{display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}} direction="column">
                            <Subtitle variant="h1" style={{fontWeight: 700}}>JUST ENJOY</Subtitle>
                            <Subtitle  variant="h4" style={{letterSpacing: 3}}>Life is made of moments. Memories. And parties.</Subtitle>
                       </Grid>
                            
                       <video  autoPlay loop muted id="video-container">
                        <source src="https://res.cloudinary.com/dplgnsjzm/video/upload/v1626958308/nightzone-backend/video/video_gw4ydm.mp4" type='video/mp4' />
                    </video> */}
                
                        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50%', flexWrap: 'wrap'}}>
                            <Typography variant="h1" className={this.props.classes.bold} color="secondary">JUST ENJOY</Typography>
                            <Typography variant="h4"  className={this.props.classes.spacing} color="secondary">Life is made of moments. Memories. And parties.</Typography>
                        </div>
                     
                </Grid>
                

        )
    }
}

export default withStyles(styles)(Home)