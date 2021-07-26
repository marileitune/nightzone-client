import React, { Component } from 'react';
import {Link, withRouter} from  'react-router-dom';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#39A6A3',
      },
      secondary: {
        main: '#BF1363',
      },
    },
  });



class NavMenu extends Component {

    render() {
        //don't show the navbar in the signin/signup form
        if (this.props.location.pathname === '/auth') {
            return null
        }
        return (
            <div>
                <Navbar style={{backgroundColor: "transparent"}} expand="lg">
                    <Container>
                       <Link to="/"><Navbar.Brand><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" alt="" width="150px"/></Navbar.Brand></Link> 
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        { 
                            this.props.user ? (
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to="/events" className="link-nav">EVENTS</Link>
                                    <Link to="/create" className="link-nav">CREATE AN EVENT</Link>
                                    <NavDropdown title="ACCOUNT" id="basic-nav-dropdown">   
                                        <Link to={`/account/${this.props.user._id}`} style={{ textDecoration: 'none' }}>My events</Link>
                                        <Link to={`/account/${this.props.user._id}/edit`} style={{ textDecoration: 'none' }}>Edit account</Link>     
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.props.onLogOut}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        ) : 
                        (
                            <ThemeProvider theme={theme}>
                        <Link to="/auth" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">GET STARTED</Button></Link>
                        </ThemeProvider>
                        )
                    }
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavMenu);