
import React from 'react'
import { withRouter} from  'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {Icon, Fab} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';


function FacebookButton(props) {
    const {onFacebookResponse} = props
  

    return (
        <div>
            <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            fields="name,email,picture"
            autoLoad={false}
            callback={onFacebookResponse}
            render={renderProps => (
                <Fab onClick={renderProps.onClick} color="primary" aria-label="add">
                    <FacebookIcon color="#DEEEEA"/>
                </Fab>
                )}
            />
        </div>
    )
}

export default withRouter(FacebookButton);

