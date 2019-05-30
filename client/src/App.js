import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';

import Student from './components/grievance/Student';
import Scst from './components/grievance/Scst';
import Internal from './components/grievance/Internal';

import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() /1000;
  if(decoded.exp < currentTime) {

    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <BrowserRouter>
        <div className="App">
           <Navbar />
             <Route exact path="/" component = {Landing} />
               <div className="container">
                 <Route exact path="/register" component = {Register} />
                 <Route exact path="/login" component = {Login} />
                 <Route exact path="/profiles" component = {Profiles} />
                 <Route exact path="/profile/:handle" component = {Profile} />
                 <Switch>
                   <PrivateRoute exact path="/dashboard" component = {Dashboard} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/create-profile" component = {CreateProfile} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/edit-profile" component = {EditProfile} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/add-experience" component = {AddExperience} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/add-education" component = {AddEducation} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/not-found" component = {NotFound} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/scst" component = {Scst} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/student" component = {Student} />
                 </Switch>
                 <Switch>
                   <PrivateRoute exact path="/internal" component = {Internal} />
                 </Switch>
               </div>
           <Footer />
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;