import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
