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
     user: null //it means that te
  }

  handleFacebookResponse = (data) => {
    this.setState({
        showLoading: true
    })

    const {name, email, picture: {data: {url}}, userID} = data
    let newUser = {name, email, image: url, facebookId: userID}

    axios.post(`${API_URL}/api/facebook/info`, newUser , {withCredentials: true})
        .then((response) => {
            this.setState({
                loggedInUser: response.data.data,
                error: null,
                showLoading: false
            }, () => {
              console.log(this.props)
                this.props.history.push('/')
            });
        })
        .catch((err) => {
          console.log(err)
        })
}

  render() {
    return (
      <>
            <NavMenu user={this.state.user} />
            <Switch>
              <Route exact path={'/'}  render={(routeProps) => {
                return <Home/>
              }} />
              <Route path={'/auth'}  render={(routeProps) => {
                return <Auth onFacebookResponse={this.handleFacebookResponse}/>
              }} />
              <Route component={NotFound} />
            </Switch>
          </>
    )
  }
}

export default withRouter(App);
