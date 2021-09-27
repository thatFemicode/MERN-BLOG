import logo from "./logo.svg";
import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/post";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
// wE HAVE TO DISPATCH OUR GET POSTS ACTION TO APP.JS USING USE DISPATCH

// (1)
// first thing done on this file after it has been pushed to master
// is finding a way to keep track of the current id(state) for the edit
// So we will be using the useState first before changint it to redux
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
