import React, { Component } from 'react';
import './index.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <p>
            Hello, <input type="text" placeholder="Your name here" />!
            It is {this.props.date.toTimeString()}
        </p>
    );
  }
}

export default App;

class CommentList extends Component {
    render() {
        return (
              <div className="commentList">
                Hello, world! I am a CommentList.
              </div>
        );
    }
}

class CommentForm extends Component {
    render() {
        return (
              <div className="commentForm">
                Hello, world! I am a CommentForm.
              </div>
        );
    }
}

class CommentBox extends Component {
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
}

export {CommentBox};

