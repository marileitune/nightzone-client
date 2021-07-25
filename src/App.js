import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import {API_URL} from './config.js'
import Styles from './App.css'
//start importing components
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import NotFound from "./components/NotFound";
import Auth from "./components/auth/Auth";
import EventsList from "./components/events/EventsList.jsx";
import EventDetail from "./components/events/EventDetail.jsx";
import CreateEvent from "./components/events/create-event/CreateEvent.jsx";


class App extends Component {
  
  state = {
     user: null,
     error: null,
     //showLoading?
  }

  handleFacebookResponse = (data) => {
    // this.setState({
    //     showLoading: true
    // })

    const {name, email, picture: {data: {url}}, userID} = data
    console.log(data, "aqui")
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
    return (
      <>
            <NavMenu user={this.state.user} onLogOut={this.handleLogOut}/>
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
              />
              }} />
              <Route component={NotFound} />
            </Switch>
          </>
    )
  }
}

export default withRouter(App);
