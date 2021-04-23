import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from "react-redux";
import store from './state/store';

// Розгортаємо store на увесь додаток.
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));