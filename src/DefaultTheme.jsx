import {createTheme, LinearProgress, withStyles, Typography, responsiveFontSizes, TextField, Checkbox, FormControl} from '@material-ui/core'
import PropTypes from 'prop-types';


const CssTextField = withStyles({
    root: {
        width: '40%', 
        minWidth: '400px', 
        maxWidth:'700px',
        color: '#DEEEEA',
        "& .MuiOutlinedInput-input": {
            color: "#DEEEEA"
          },
          "& .MuiInputLabel-root": {
            color: "#DEEEEA"
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#DEEEEA"
          },
          "&:hover .MuiOutlinedInput-input": {
            color: "#BF1363"
          },
          "&:hover .MuiInputLabel-root": {
            color: "#BF1363"
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#BF1363"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#39A6A3"
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#39A6A3"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#39A6A3"
          }
        }
})(TextField);

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
    },
    colorPrimary: {
      backgroundColor: '#DEEEEA'
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#39A6A3',
    },
  })(LinearProgress);

  const BorderLinearProgressMid = withStyles({
    root: {
      height: 10,
    },
    colorPrimary: {
      backgroundColor: '#DEEEEA'
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#894F7D',
    },
  })(LinearProgress);

  const BorderLinearProgressRock = withStyles({
    root: {
      height: 10,
    },
    colorPrimary: {
      backgroundColor: '#DEEEEA'
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#BF1363',
    },
  })(LinearProgress);

const CustomDateInput = withStyles({
    root: {
        width: '10%', 
        minWidth: '150px', 
        maxWidth:'250px',
        color: '#DEEEEA',
        "& .MuiOutlinedInput-input": {
            color: "#DEEEEA"
          },
          "& .MuiInputLabel-root": {
            color: "#DEEEEA"
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#DEEEEA"
          },
          "&:hover .MuiOutlinedInput-input": {
            color: "#BF1363"
          },
          "&:hover .MuiInputLabel-root": {
            color: "#BF1363"
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#BF1363"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#39A6A3"
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#39A6A3"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#39A6A3"
          }
        }
})(TextField);



const CustomSelect = withStyles({
    root: {
      width: 200,

      "& .MuiOutlinedInput-input": {
        color: "#DEEEEA"
      },
      "& .MuiInputLabel-root": {
        color: "#DEEEEA"
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DEEEEA"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#BF1363"
      },
      "&:hover .MuiInputLabel-root": {
        color: "#BF1363"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#BF1363"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#39A6A3"
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#39A6A3"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#39A6A3"
      }
    }
  })(FormControl);

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
                            '&.CustomStrokeButton': {
                                borderColor:  '#DEEEEA',
                                color: '#DEEEEA',
                                fontWeight: 700,
                                "&:hover ": {
                                    borderColor: "#BF1363",
                                    color: '#BF1363',
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


export {CssTextField, Brand, Subtitle, theme, BorderLinearProgress, BorderLinearProgressMid, BorderLinearProgressRock, CustomCheckbox, CustomDateInput, CustomSelect}

