import React from 'react';
import ReactDOM from 'react-dom';
import App,{Game} from './PopupApp';
import './index.css';

chrome.storage.local.get('state', obj => {
  const {state} = obj;
  ReactDOM.render(<Game state={state} />, document.getElementById('root'));
});

