/// external modules ///
import React from 'react';
import ReactDOM from 'react-dom';

/// internal modules ///
import App from './App';

/// styles ///
import 'reset-css/reset.css';
import 'normalize-css/normalize.css';
import './styles/o11-basics.css';
import './styles/index.css';

/***************************************
  APP
***************************************/
ReactDOM.render (
  <App />
, document.getElementById ('root')
);
