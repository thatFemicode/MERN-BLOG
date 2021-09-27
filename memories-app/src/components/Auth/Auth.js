import React from "react";
import { useState } from "react";
import Icon from "./Icon";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  // we need to have something that would manage out password incase we want to show it
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // two types of submitnone for the signup and another fot the signin
    if (isSignup) {
      // We are going to dispatch an action
      // We pass in the formData and history so we can navigate once something happens
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    // this function is simply checking the state of the previous password and negating(toggling) it
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  // Funtion for google succes and google failure
  const googleSuccess = async (res) => {
    // the below is optional chaining
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      // we have to dipatch something
      dispatch({ type: "AUTH", data: { result, token } });
      // To redirect back to home once we login
      history.push("/");
      // the data above is the payload
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was Unsuccesful, Try again Later");
  };
  // THis FORM NEEDS TO SAY SIGNUP OR SIGN IN
  const state = null;
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form action="" className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              // We will be changing the type to text because what if we want to click that button which is show password
              // so we wiil be using a state to manage out shoe password
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="210352706769-tb80nbnuj5da1q912mgu5ut9uhbhg3ea.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          {/* <GoogleLogin
            clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign In"
                : "Dont have an account? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
