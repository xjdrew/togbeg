import React from 'react';
import ReactDOM from 'react-dom';
import App, {Game} from './PopupApp';

it('PopupApp renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App date={new Date()} />, div);
});

it('Game renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});
