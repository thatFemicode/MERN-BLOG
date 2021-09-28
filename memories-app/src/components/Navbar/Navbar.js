import React from "react";
import { useState, useEffect } from "react";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
const Navbar = () => {
  const classes = useStyles();
  // We are immediately going to fetch something from the localstorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profi")));
  // Logout function we need to sdispatch an action
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    // Set user
    setUser(null);
  };
  // Navigating back the home after login wiith useEffect functionality
  useEffect(() => {
    // check if token exist
    const token = user?.token;

    // We have to check if token has expired so we can log user out
    // This part is the token expiry section
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    // Later we will check for the JSON Webtoken
    setUser(JSON.parse(localStorage.getItem("profi")));
  }, [location]);
  // The  above location in the dependency means when location changes set the user
  // console.log(user);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">
          <img src={memoriesText} alt="icon" height="45px" />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="memories"
            height="60px"
          />
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sigin
          </Button>
        )}
        {/* Login for if the user is logged in or not */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
