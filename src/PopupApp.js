import React, { Component } from 'react';
import './index.css';
import './App.css';

function Square(props) {
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
}

class Board extends Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />;
  }
  render() {
    var rows = new Array(3);
    for (var row=0; row<=2; row++) {
      var squares = new Array(3);
      for(var col=0; col<=2; col++) {
        squares[col] = this.renderSquare(row * 3 + col);
      }
      rows[row] = <div key={row} className="board-row"> {squares} </div>;
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

function ResetButton(props) {
  return (
    <button onClick={() => props.onClick()}>
      {"Reset Game"}
    </button>
  );
}

class Game extends Component {
  constructor(props) {
	  super(props);
    if (props.state == null){
      this.state = this.getInitState();
    } else {
      this.state = props.state
    }
  }

  getInitState() {
    return {
      history: [{
        squares: Array(9).fill(null),
        row: null,
        col: null,
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  resetGame() {
    this.setState(this.getInitState(), ()=>chrome.storage.local.set({state:this.state}));
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
    	history: history.concat([{
      	squares: squares,
        row: Math.floor(i/3),
        col: i%3,
    	}]),
    	xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    }, () => {
      chrome.storage.local.set({state:this.state})
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
	}

  render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		const moves = history.map((step, move) => {
			var desc = move ?
				'Move #' + move :
				'Game start';
      if(step.row != null) {
        desc += `(${step.row},${step.col})`
      }
			return (
				<li key={move} className={move === this.state.stepNumber?"ol-selected-item":""}>
					<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
				</li>
			);
		});

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={ i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <ResetButton onClick={() => this.resetGame()} />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}

export default Game;
