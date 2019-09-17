import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import './index.scss';

import { createStore } from 'redux';
import authReducer from './store/reducers/authReducer';
import { Provider } from 'react-redux';

const store = createStore(authReducer);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
