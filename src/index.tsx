import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import '@/styles/index.scss';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from '@/store';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

const app = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
