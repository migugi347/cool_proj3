import React from 'react';
import { Link } from 'react-router-dom';
import Mainlayout from '../layouts/Mainlayout';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Maptest = () => {

  const mapStyles = {
    height: "100vh",
    width: "60%"
  };

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  };

  return (
  <Mainlayout>
	<div className="textSide">
		<h1> Text Side </h1>
	</div>
	<div className="mapcontainer">
		<LoadScript
			googleMapsApiKey='AIzaSyAlpHWlQyFeFQTX2b3GgVaRBMcvXhzwQyo'>
			<GoogleMap
				mapContainerStyle={mapStyles}
				zoom={13}
				center={defaultCenter}
			/>
		</LoadScript>
	</div>
  </Mainlayout>
  )
};

export default Maptest;
/*
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
/* code above is equivalent to this
class Square extends React.Component {
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
} */
/*
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {squares: Array(9).fill(null)};
    xIsNext: true;
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = (this.state.xIsNext ? 'O' : 'X');
    this.setState({xIsNext: !this.state.xIsNext});
    this.setState({squares: squares});
  }
  
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />);
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'O' : 'X');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          //<div>{/* status *///}</div>
          //<ol>{/* TODO */}</ol>
        /*</div>
      </div>
    );
  }
}
/*
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
*/