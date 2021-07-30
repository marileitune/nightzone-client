
import React from 'react'
import { withRouter} from  'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {Icon, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';


function FacebookButton(props) {
    const {onFacebookResponse} = props
  

    return (
        <div style={{paddingRight: '1%'}}>
            <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            fields="name,email,picture"
            autoLoad={false}
            callback={onFacebookResponse}
            render={renderProps => (
                <Button onClick={renderProps.onClick}  className="CustomFab">
                    <FacebookIcon color="#DEEEEA"/>
                </Button>
                )}
            />
        </div>
    )
}

export default withRouter(FacebookButton);

