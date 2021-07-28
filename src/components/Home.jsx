import React, { Component } from 'react'
import { Typography, Paper, Container, ThemeProvider } from '@material-ui/core';
import {createTheme, withStyles} from '@material-ui/core/styles'



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
                <Container maxWidth="sm">
                    <video  autoPlay loop muted id="video-container">
                        <source src="https://res.cloudinary.com/dplgnsjzm/video/upload/v1626958308/nightzone-backend/video/video_gw4ydm.mp4" type='video/mp4' />
                    </video>
                
                        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50%', flexWrap: 'wrap'}}>
                            <Typography variant="h1" style={{width: "max-content"}}  className={this.props.classes.bold} color="secondary">JUST ENJOY</Typography>
                            <Typography variant="h4" style={{width: "max-content"}} className={this.props.classes.spacing} color="secondary">Life is made of moments. Memories. And parties.</Typography>
                        </div>
           
              
                </Container>
                

        )
    }
}

export default withStyles(styles)(Home)