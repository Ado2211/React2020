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
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import { HashRouter, Switch, Route,  } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import UserLoginPage from './components/UserLoginPage/UserLoginPage';

const menuItems = [
  new MainMenuItem("Home", "/"),
  new MainMenuItem("Contact", "/contact/"),
  new MainMenuItem("Log in", "/user/login/"),

];

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items={menuItems}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path="/" component= {HomePage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route exact path="/user/login" component={UserLoginPage}/>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
