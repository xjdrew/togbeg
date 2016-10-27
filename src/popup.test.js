import React from 'react';
import ReactDOM from 'react-dom';
import App from './PopupApp';

it('Game renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
