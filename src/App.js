import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';
import {API_URL} from './config.js'
import Styles from './App.css'
import { ThemeProvider,  } from "@material-ui/styles";
import {CircularProgress} from '@material-ui/core';

//start importing components
import Home from './components/Home';
import MyAppBar from './components/MyAppBar';
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import EventsList from "./components/events/EventsList";
import EventDetail from "./components/events/EventDetail";
import CreateEvent from "./components/events/create-event/CreateEvent";
import Account from "./components/user/Account";
import EditEvent from "./components/events/EditEvent"
import EditAccount from "./components/user/EditAccount"
import ChatPage from './components/chat/ChatPage'

//importing styles
import {theme} from './DefaultTheme'

//COMPONENT
class App extends Component {
  
  state = {
     user: null,
     error: null,
     fetchingUser: true, 
  }

  componentDidMount = async () => {
        try {
           let userResponse = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
           await this.setState({
              user: userResponse.data,
              fetchingUser: false,
           })
         } catch(err) {
            await this.setState({
              user: null,
              fetchingUser: false,
            })
         }
         
     } 

  handleFacebookResponse = (data) => {
    // this.setState({
    //     showLoading: true
    // })

    console.log("data", data)
    const {name, email, picture: {data: {url}}, userID} = data
    let newUser = {name, email, imageAccount: url, facebookId: userID}

    axios.post(`${API_URL}/api/facebook/info`, newUser , {withCredentials: true})
        .then((response) => {
          console.log(response.data)
            this.setState({
                user: response.data.data,
                error: null,
                // showLoading: false
            }, () => {
              console.log(this.props)
               console.log(this.state.user.imageAccount)
                this.props.history.push('/events')
            });
        })
        .catch((err) => {
          console.log(err)
        })
  }

  handleGoogleSuccess= (data) => {

    // this.setState({
    //   showLoading: true
    // })

    const {givenName, familyName, email, imageUrl, googleId} = data.profileObj
    let newUser = {
      firstName: givenName,
      lastName: familyName,
      email,
      imageAccount: imageUrl,
      googleId
    }

    axios.post(`${API_URL}/api/google/info`, newUser , {withCredentials: true})
      .then((response) => {
        this.setState({
          user: response.data.data,
          error: null,
          // showLoading: false
        }, () => {
          this.props.history.push('/events')
        });
      })
  }

  handleLogOut = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, {withCredentials: true})
      // clearing the user once they logout
      this.setState({
        user: null
      } , () => {

        this.props.history.push('/')
      })

    }
    catch(err) {
      console.log('Logout failed', err)
    }
  }

  //this will change the state of the user when a sign in or sign up is done. Data is the user data.
  handleUserState = (data) => {
    this.setState({
      user: data
    })
  }


  render() {
    if (this.state.fetchingUser){
      return <CircularProgress color="secondary" />
    }

    return (
      <ThemeProvider theme={theme}>
            <MyAppBar user={this.state.user} onLogOut={this.handleLogOut}/>
            <Switch>
              <Route exact path={'/'}  render={(routeProps) => {
                return <Home/>
              }} />
              <Route path={'/auth'}  render={(routeProps) => {
                return <Auth {...routeProps}
                  user={this.state.user} 
                  onFacebookResponse={this.handleFacebookResponse} 
                  onGoogleResponse={this.handleGoogleSuccess}
                  onAuth={this.handleUserState}
                />
              }} />
              <Route exact path={'/events'}  render={(routeProps) => {
                return <EventsList {...routeProps}
                  user={this.state.user} 
                  onAuth={this.handleUserState}
                />
              }} />
              <Route exact path={'/events/:eventId'}  render={(routeProps) => {
                return <EventDetail {...routeProps}
                  user={this.state.user} />
              }} />
               <Route exact path={'/create'}  render={(routeProps) => {
                return <CreateEvent {...routeProps}
                user={this.state.user}
              />
              }} />
              <Route exact path={'/account/:userId'}  render={(routeProps) => {
                return <Account {...routeProps}
                user={this.state.user}
              />
              }} />
              <Route exact path={'/events/:eventId/edit'}  render={(routeProps) => {
                return <EditEvent {...routeProps}
                user={this.state.user} 
              />
              }} />
              <Route exact path={'/account/:userId/edit'}  render={(routeProps) => {
                return <EditAccount {...routeProps}
                user={this.state.user}
              />
              }} />
              <Route exact path={'/chat/:userId'}  render={(routeProps) => {
                return <ChatPage {...routeProps}
                user={this.state.user}
              />
              }} />
              <Route component={NotFound} />
            </Switch>
      </ThemeProvider>
    )
  }
}

export default withRouter(App);
