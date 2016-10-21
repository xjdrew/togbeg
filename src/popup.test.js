import React from 'react';
import ReactDOM from 'react-dom';
import App, {CommentBox} from './PopupApp';

it('PopupApp renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App date={new Date()} />, div);
});

it('CommentBox renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentBox />, div);
});
