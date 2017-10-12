/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, hashHistory } from 'react-router';
/* eslint no-unused-vars:0 */
import * as d from 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/cosmo/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles/bootstrap-override.scss';
import './styles/main.scss';

import MainLayout from './components/MainLayout';

import Main from './components/main/Main';
import Loans from './components/stats/Loans';
import store from './stores/store';

/* global document */
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Redirect from="/" to="loans" />
      <Route path="/" component={MainLayout}>
        <Route path="loans" component={Loans} />
        <Route path="main" component={Main} />
      </Route>
    </Router>
  </Provider>
  , app,
);
