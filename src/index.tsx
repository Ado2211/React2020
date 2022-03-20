import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { HashRouter, Switch, Route, } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import UserLoginPage from './components/UserLoginPage/UserLoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import { UserRegistrationPage } from './components/UserRegistrationPage/UserRegistrationPage';
import AdministratorLoginPage from './components/AdministratorLoginPage/AdministratorLoginPage';
import AdministratorDashboard from './components/AdministratorDashboard/AdministratorDashboard';


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/user/login" component={UserLoginPage} />
        <Route path="/user/register" component={UserRegistrationPage} />
        <Route path="/category/:cId" component={CategoryPage} />
        <Route path="/administrator/login" component={AdministratorLoginPage} />
        <Route path="/administrator/dashboard" component={AdministratorDashboard} />

        
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
