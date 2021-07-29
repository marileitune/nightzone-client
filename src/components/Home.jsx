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
                <Grid container wrap="nowrap" spacing={2} direction="column" justify="center" alignItems= 'center' style={{ minHeight: '100vh'}} >
                        <video  autoPlay loop muted id="video-container">
                            <source src="https://res.cloudinary.com/dplgnsjzm/video/upload/v1626958308/nightzone-backend/video/video_gw4ydm.mp4" type='video/mp4' />
                        </video> 
           
                       <Grid >
                            <Subtitle variant="h1" style={{fontWeight: 700, textAlign: 'center'}}>JUST ENJOY</Subtitle>
                            <Subtitle  variant="h4" style={{letterSpacing: 3, textAlign: 'center'}}>Life is made of moments. Memories. And parties.</Subtitle>
                       </Grid>
                            
            
                
            
                     
                </Grid>
                

        )
    }
}

export default withStyles(styles)(Home)