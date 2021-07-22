import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import {API_URL} from './config.js'

//start importing components
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import NotFound from "./components/NotFound";
import Auth from "./components/Auth";


class App extends Component {
  
  state = {
     user: null,
     error: null
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
                showLoading: false
            }, () => {
              console.log(this.props)
               console.log(this.state.user.imageAccount)
                this.props.history.push('/')
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
          showLoading: false
        }, () => {
          this.props.history.push('/')
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

  render() {
    return (
      <>
            <NavMenu user={this.state.user} onLogOut={this.handleLogOut}/>
            <Switch>
              <Route exact path={'/'}  render={(routeProps) => {
                return <Home/>
              }} />
              <Route path={'/auth'}  render={(routeProps) => {
                return <Auth onFacebookResponse={this.handleFacebookResponse} onGoogleResponse={this.handleGoogleSuccess}/>
              }} />
              <Route component={NotFound} />
            </Switch>
          </>
    )
  }
}

export default withRouter(App);
