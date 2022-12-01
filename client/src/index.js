import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.min.css';
import {Provider} from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import PromiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer';

const createStoreWithMiddleWare = applyMiddleware(PromiseMiddleWare, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider 
    store = {createStoreWithMiddleWare(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <App />
  </Provider>
);

reportWebVitals();
