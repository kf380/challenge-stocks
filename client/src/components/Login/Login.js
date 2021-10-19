import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { authUser } from "../../redux/actions";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();
export function validate(input) {
    let errors = {};
    if (!input.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "Email is invalid";
    }
    if (!input.password) {
      errors.password = "Password is required";
    } else if (!/(?=.*[0-9])/.test(input.password)) {
      errors.password = "Password is invalid";
    }
    return errors;
  }
 
export default function SignInSide() {
    const dispatch = useDispatch();  
    const history = useHistory();
    const [input, setInput] = useState({
        username: "",
        password: "",
      }); 

      const handleInputChange = function (e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    
      };

   
  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(authUser(input));
    // setInput({
    //   email: "",
    //   password: "",
    // });
     history.push("/table");
    console.log(input,"inpuut")
  };
  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}  >
    {/* {({errors}) =>( */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleInputChange}
                autoFocus
              />
              {/* <ErrorMessage name="user" component={() => <div>{errors.user}</div>}/> */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleInputChange}
                id="password"
                autoComplete="current-password"
              />
              {/* <ErrorMessage name="password" component={() => <div>{errors.password}</div>}/> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
   
            {/* </Box> */}
          </Box>
        </Grid>
      </Grid>
      </form>
    </ThemeProvider>
    )}
  
