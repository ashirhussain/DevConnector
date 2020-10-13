import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../src/components/layout/Navbar";
import Landing from "../src/components/layout/Landing";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "../src/components/layout/Alert";
import { loadUser } from "../src/actions/auth";
import { setTokenToHeader } from "../src/utils/setToken";
import Dashboard from '../src/components/dashboard/Dashboard';
import Privateroute from '../src/components/routing/Privateroute';
import CreateProfile from '../src/components/layout/profile-form/CreateProfile';
import EditProfile from '../src/components/layout/profile-form/EditProfile';
import Addexperience from '../src/components/layout/profile-form/AddExperience';
import Addeducation from '../src/components/layout/profile-form/AddEducation';
import Profiles from '../../client/src/components/layout/profiles/Profiles';
import Profile from '../../client/src/components/layout/profile/Profile';
import Posts from '../../client/src/components/layout/posts/Posts';
import Post from '../../client/src/components/layout/post /Post';


const App = () => {
  if (localStorage.token) {
    setTokenToHeader(localStorage.token);
    console.log("running")
  }
  useEffect(() => {
    if(localStorage.token){
    store.dispatch(loadUser());
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>
              <Route exact path="/profile/:id" component={Profile}></Route>
              <Privateroute exact path="/dashboard" component={Dashboard}></Privateroute>
              <Privateroute exact path="/create-profile" component={CreateProfile}></Privateroute>
              <Privateroute exact path="/edit-profile" component={EditProfile}></Privateroute>
              <Privateroute exact path="/add-experience" component={Addexperience}></Privateroute>
              <Privateroute exact path="/add-education" component={Addeducation}></Privateroute>
              <Privateroute exact path="/posts/:id" component={Post}></Privateroute>
              <Privateroute exact path="/posts" component={Posts}></Privateroute>




            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
