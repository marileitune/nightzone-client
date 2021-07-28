import {createTheme, withStyles, Typography, responsiveFontSizes, TextField, Checkbox} from '@material-ui/core'
import PropTypes from 'prop-types';


const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#39A6A3",
            width : '1000%',
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

const Brand = withStyles({
    root: {
      fontFamily:'Monoton',
      background: "-webkit-linear-gradient(45deg, #39A6A3 30%, #BF1363 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  })(Typography);
  
  const Subtitle = withStyles({
    root: {
      fontFamily:'Montserrat',
      background: "#DEEEEA",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  })(Typography);

  const CustomCheckbox = withStyles({
    root: {
      color: "#DEEEEA",
      '&$checked': {
        color: "#BF1363",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

let theme = createTheme ({
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
    
    theme = responsiveFontSizes(theme);


export {CssTextField, Brand, Subtitle, theme, CustomCheckbox}

