import React from 'react';
import ReactDOM from 'react-dom';
import App from './PopupApp';

import './index.css';

chrome.storage.local.get('state', obj => {
  const {state} = obj;
  ReactDOM.render(<App state={state} />, document.getElementById('root'));
});

