import React from 'react';
import { Link } from 'react-router-dom';
import Mainlayout from '../layouts/Mainlayout';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


class AddressInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			origin: GoogleMap.LatLng,
			errorMsg: "",
		};
	}
	
	findMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					
					this.setState({origin: pos});
				},
				() => {
					this.setState({errorMsg: "Error: The Geolocation service failed."});
				}
			);
		} else {
			this.setState({errorMsg: "Error: Your browser doesn't support geolocation."});
		}
	}
	
	render() {
		if (false/*address construct is filled out*/) {
			document.getElementByID("map").setCenter(this.state.origin);
			return (
				<h1> List of Starbucks Restraunts </h1>
			);
		} else {
			return (
				<>
					<h1> Address Input Options </h1>
					{ /*this error thing is totally broken, and I have no idea why*/ }
					{ this.state.errorMsg && <h3 className="error"> { this.state.errorMsg } </h3> }
					<p> City:  <input float="right" placeholder="City" /> </p>
					<p> State: <input float="right" placeholder="State" /> </p>
					<p> <button className="buttonGeoLocate" id="GetOriginCityState"> City and State </button> </p>
					<p> OR </p>
					<p> Zip:   <input float="right" placeholder="Zip Code" /> </p>
					<p> <button className="buttonGeoLocate" id="GetOriginZip"> Zip Code </button> </p>
					<p> OR </p>
					<p> <button className="buttonGeoLocate" id="GetOriginAuto" onClick={this.props.findMe}> Get Position Automatically </button> </p>
					
				</>
			);
		}
	}
}

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
		<AddressInput />
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