import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import PropTypes from 'prop-types';
import {AppBar, Button, Toolbar, Typography, List, ListItem, withStyles, Grid, SwipeableDrawer, Menu, MenuItem, Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styleSheet = {
  list : {
    width : 200,
  },
  padding : {
    paddingRight : 30,
    cursor : "pointer",
  },

  sideBarIcon : {
    padding : 0,
    color : "white",
    cursor : "pointer",
  }
}

const Brand = withStyles({
  root: {
    fontSize: '1.5rem',
    fontFamily:'Monoton',
    background: "-webkit-linear-gradient(45deg, #39A6A3 30%, #BF1363 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }
})(Typography);

class MyAppBar extends Component{
  constructor(props){
    super(props);
    this.state = {
        drawerActivate:false, 
        drawer:false, 
        anchorEl: null
    };
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

    handleClick = async (event) => {
        await this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = async () => {
        await this.setState({
            anchorEl: null
        });
    };
    
  componentWillMount(){
    if(window.innerWidth <= 600){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 600){
        this.setState({drawerActivate:true});
      }
      else{
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  createDrawer(){
    return (
      <div>
        <AppBar color="transparent" elevation="0">
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />
              <Brand variant="h1" > <Link to="/" style={{ textDecoration: 'inherit'}}>NIGHTZONE</Link></Brand>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>

           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>

            { 
                this.props.user ? (
            <>
            <List className = {this.props.classes.list}>
               <Link to="/events" style={{ textDecoration: 'none', color: 'inherit'}}><ListItem key = {1} button divider style={{fontWeight: 700}}> Events </ListItem></Link>
               <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}><ListItem key = {2} button divider style={{fontWeight: 700}}> Create an event </ListItem></Link>
               <Link to={`/account/${this.props.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItem key = {3} button divider style={{fontWeight: 700}}> My events </ListItem></Link>
               <Link to={`/account/${this.props.user._id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItem key = {4} button divider style={{fontWeight: 700}}> Messages </ListItem></Link>
               <Link to={`/user/messages`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItem key = {5} button divider style={{fontWeight: 700}}> Edit account </ListItem></Link>
               <ListItem key = {5} button divider onClick={this.props.onLogOut}> <ExitToAppIcon/>  Logout </ListItem>
            </List>
            </>) : (
                <List className = {this.props.classes.list}>
                <Link to="/auth" style={{ textDecoration: 'none' }}><ListItem key = {1} button divider> Get started </ListItem> </Link>
            </List>
            )
            } 
         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    const {classes} = this.props
    const {anchorEl} = this.state
    return (
      <AppBar color="transparent" elevation="0">
        <Toolbar>
            <Brand variant="h1" style={{flexGrow:1, color: "-webkit-linear-gradient(45deg, #39A6A3 30%, #BF1363 90%)"}} ><Link to="/"style={{ textDecoration: 'inherit' }}>NIGHTZONE</Link></Brand>
           {
                this.props.user ? (
            <>
                <Link to="/events" style={{ textDecoration: 'none' }}><Typography className = {classes.padding} color="secondary" style={{fontWeight: 700}}>EVENTS</Typography></Link>
                <Link to="/create" style={{ textDecoration: 'none' }}><Typography className = {classes.padding} color="secondary" style={{fontWeight: 700}}>CREATE AN EVENT</Typography></Link>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}><Typography className = {classes.padding} color="secondary" style={{fontWeight: 700}}>PROFILE</Typography></Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    >
                    <MenuItem><Link to={`/account/${this.props.user._id}`} style={{ textDecoration: 'none' , color: 'inherit'}} color="secondary">My events</Link></MenuItem>
                    <MenuItem><Link to={`/user/messages`} style={{ textDecoration: 'none' , color: 'inherit'}} color="secondary">Messages</Link></MenuItem>
                    <Link to={`/account/${this.props.user._id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }} color="secondary"><MenuItem>Edit account</MenuItem></Link>
                    <Divider/>
                   <MenuItem onClick={this.props.onLogOut}><ExitToAppIcon/> Logout</MenuItem>
                </Menu>
          </>    
                ) : (
                  <Link to="/auth" style={{ textDecoration: 'none' }}> <Typography variant = "subheading" className = {classes.padding} color="inherit" >GET STARTED</Typography> </Link>
                )
            }
            </Toolbar>
      </AppBar>
    )
  }

  render(){
    //don't show the navbar in the signin/signup form
    if (this.props.location.pathname == '/auth') {
        return null
    }
    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

MyAppBar.propTypes = {
  classes : PropTypes.object.isRequired
};
 

export default withStyles(styleSheet)(withRouter(MyAppBar));