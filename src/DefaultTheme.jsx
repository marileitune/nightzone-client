import {createTheme, withStyles, responsiveFontSizes} from '@material-ui/core'
import PropTypes from 'prop-types';
import { Typography, TextField, Container} from '@material-ui/core';

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#39A6A3"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#DEEEEA",
            },
            "&:hover fieldset": {
                borderColor: "#BF1363",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#39A6A3",
            }
        }

    }
})(TextField);

const customTheme = () => {
    return createTheme ({
        palette: {
                    primary: {
                        main: '#39A6A3',
                        contrastText: '#DEEEEA'
                    },
                    secondary: {
                        main: '#DEEEEA',
                    },
                    background: {
                        paper: '#231E23'
                    },
                    text: {
                        primary: '#DEEEEA',
                        secondary: '#231E23'
                    },
                  },
                typography: {
                    fontFamily: 'Montserrat'
                },
        overrides: {
                    MuiButton: {
                        root: {
                            '&.CustomButton': {
                                background: '#39A6A3',
                                color: '#DEEEEA',
                                fontWeight: 700,
                                "&:hover ": {
                                    background: "#BF1363",
                                    color: '#DEEEEA',
                                },
                            },
                            '&.CustomFab': {
                                background: '#39A6A3',
                                color: '#DEEEEA',
                                borderRadius: '100%',
                                padding: '20px',
                                "&:hover ": {
                                    background: "#BF1363",
                                    color: '#DEEEEA',
                                },
                            }
                        },
                    },
        }
    })
}

export {CssTextField, customTheme}

