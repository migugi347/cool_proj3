import React from 'react';
import { Link } from 'react-router-dom';
import Mainlayout from '../layouts/Mainlayout';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Axios from "axios";

const defaultCenter = {
	lat: 41.3851, lng: 2.1734
};

class Mappage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: null,
			stores: null,
			errorMsg: "",
		};
		console.log(this.state.position);
	}
	
	componentDidUpdate() {
		console.log("Position:");
		console.log(this.state.position);
		console.log("Stores:");
		console.log(this.state.stores);
		console.log("Error State:");
		console.log(this.state.errorMsg);
	}
	  
	FindMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					this.setState({position: pos});
				},
				() => {
					this.setState({errorMsg: "Error: The Geolocation service failed."});
				}
			);
		} else {
			this.setState({errorMsg: "Error: Your browser doesn't support geolocation."});
		}
	}
	
	DummyLocationFinder() {
		console.log("Dummy button fired.");
	}
	
	renderAddressInput() {
		if (this.state.position) {
			if (this.state.stores) {
				return (
					<h1> List of Starbucks Restraunts </h1>
				);
			} else {
				const lat = this.state.position.lat;
				const lng = this.state.position.lng;
				Axios.get("http://localhost:3001/getLocations", 
						{params: {lati: lat, longi: lng}}
						).then((response) => {
					this.setState({stores: response.data});
				});
				return (
					<h1> Loading... </h1>
				)
			}
		} else {
			return (
				<>
					<h1> Address Input Options </h1>
					{ /*this error thing is totally broken, and I have no idea why*/ }
					{ this.state.errorMsg && <h3 className="error"> { this.state.errorMsg } </h3> }
					<p> City:  <input float="right" placeholder="City" /> </p>
					<p> State: <input float="right" placeholder="State" /> </p>
					<p> <button className="buttonGeoLocate" id="GetOriginCityState" onClick={() => this.DummyLocationFinder()}> City and State </button> </p>
					<p> OR </p>
					<p> Zip:   <input float="right" placeholder="Zip Code" /> </p>
					<p> <button className="buttonGeoLocate" id="GetOriginZip" onClick={() => this.DummyLocationFinder()}> Zip Code </button> </p>
					<p> OR </p>
					<p> <button className="buttonGeoLocate" id="GetOriginAuto" onClick={() => this.FindMe()}> Get Position Automatically </button> </p>
					
				</>
			);
		}
	}
	
	GetPosition() {
		if (this.state.position) {
			return this.state.position;
		} else {
			return defaultCenter;
		}
	}
	
	BuildStoreMarker(index) {
		return (<Marker position={{lat: this.state.stores[index].latittude, lng: this.state.stores[index].longitude}} />);
	}
	
	GenerateMarkers() {
		if (this.state.stores) {
			const stores = this.state.stores;
			return (<>{stores.map((store, index) =>
                <Marker position={{lat: store.latittude, lng: store.longitude}} />
            )}</>);
		} else {
			return (<></>);
		}
	}

	render() {
	
		const mapStyles = {
			height: "100vh",
			width: "60%"
		};
		
		return (
		<Mainlayout>
			<div className="textSide">
				{this.renderAddressInput()}	
			</div>
			<div className="mapcontainer">
				<LoadScript
					googleMapsApiKey='AIzaSyAlpHWlQyFeFQTX2b3GgVaRBMcvXhzwQyo'>
					<GoogleMap id="map"
						mapContainerStyle={mapStyles}
						zoom={13}
						center={this.GetPosition()}
					>
					{this.GenerateMarkers()}
					</GoogleMap>
				</LoadScript>
			</div>
		</Mainlayout>
		)
	}
};

export default Mappage;
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