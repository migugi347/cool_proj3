import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Mainlayout from '../layouts/Mainlayout';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Axios from "axios";
import axios from 'axios';
import { API_URL } from "../API";

const defaultCenter = {
	lat: 41.3851, lng: 2.1734
};

/**
 * Displays Google Maps API. Allows users to find all nearest Starbucks at their current
 * location or a location the user specifically inputs. This includes inputting a city's name
 * and state or it's ZIP code. Also, a map of the location is displayed and red markers
 * have been included in order to show where all the nearest Starbucks to the user are.
 */
class Mappage extends React.Component {
	/**
	 * Constructs a Mappage object by setting all members to their default values.
	 * @param {*} props - Mappage class' properties
	 */
	constructor(props) {
		super(props);
		this.state = {
			position: null,
			stores: null,
			errorMsg: "",
		};
		//console.log(this.state.position);
	}
		
	/**
	 * Sets the map's current location to that of the user's location. Outputs an error
	 * message if the geolocation service fails or isn't supported by the user's browser.
	 */
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
	
	/**
	 * Sets the map's current location to that of a specific ZIP code.
	 * @param {zip} x - location's ZIP code
	 */
	findByZip(x) {
		let lat,lng;
		Axios.get(API_URL +"/getByZip", 
				{params: {zip:x}}
				).then((response) => {
					lat=response.data[0].latittude;
					lng=response.data[0].longitude;
					this.setState({position: {lat:lat ,lng:lng}});
			this.setState({stores: response.data});
		});
		
		
	}

	/**
	 * Sets the map's current location to that of a specific city and state.
	 * @param {city} x - location's city
	 * @param {state} y  - location's state
	 */
	findByCity(x,y){
		let lat,lng;
		Axios.get(API_URL +"/getByCity", 
				{params: {city:x,state:y}}
				).then((response) => {
					lat=response.data[0].latittude;
					lng=response.data[0].longitude;
					this.setState({position: {lat:lat ,lng:lng}});
			this.setState({stores: response.data});
		});
	}
	
	/**
	 * Determines if the current postcode is correct. If not, outputs an
	 * error message.
	 * @param {postcode} postcode - 
	 * @returns postcode
	 */
	FixPostcode(postcode) {
		if (postcode.length != 5 && postcode.length != 9) {
			this.setState({errorMsg: "Unknown postcode!"});
			return postcode;
		}
		if (postcode.length == 9) {
			return postcode.slice(0, 5) + "-" + postcode.slice(5, 9);
		} else {
			return postcode;
		}
	}
	
	/**
	 * Displays text to the left of the map. First, displays the options for the user
	 * to input a specific location or use their current location. Once an option has been chosen, 
	 * a loading page is displayed while the result loads. Finally, a list of the stores at the inputted
	 * location are produced.
	 * @returns {HTML} - code displaying text left of the map
	 */
	renderAddressInput() {
		if (this.state.stores) {
			const stores = this.state.stores;
			return ( <>
				<h1> List of Starbucks Restraunts </h1>
				{stores.map((store, index) => 
					<>
						<p> 
							<b>{(index+1).toString() + ") " + store.name}</b>
							<p style={{margin:'0px'}}>{store.street}</p>
							<p>{store.city + ", " + store.state + " " + this.FixPostcode(store.postcode)}</p>
						</p>
					</>
				)}
				</>
			);
		} 
		else if(this.state.position){
			const lat = this.state.position.lat;
			const lng = this.state.position.lng;
			Axios.get(API_URL +"/getLocations", 
					{params: {lati: lat, longi: lng}}
					).then((response) => {
				this.setState({stores: response.data});
			});
			return (
				<h1> Loading... </h1>
			)
		}
		else {
			return (
				<>
					<h1> Address Input Options </h1>
					{ /*this error thing is totally broken, and I have no idea why*/ }
					{ this.state.errorMsg && <h3 className="error"> { this.state.errorMsg } </h3> }
					<p> City:  <input id = "city" float="right" placeholder="College Station" /> </p>
					<p> State: <input id ="state" statefloat="right" placeholder="TX" /> </p>
					<p> <button className="buttonGeoLocate" id="GetOriginCityState" onClick={() => this.findByCity(document.getElementById('city').value,document.getElementById('state').value)}> City and State </button></p>
					<p> OR </p>
					<p> Zip:   <input id="zipEntry" float="right" placeholder="Zip Code"/> </p>
					<p> <button className="buttonGeoLocate" id="GetOriginZip" onClick={() => this.findByZip(document.getElementById('zipEntry').value)}> Zip Code </button> </p>
					<p> OR </p>
					<p> <button className="buttonGeoLocate" id="GetOriginAuto" onClick={() => this.FindMe()}> Get Position Automatically </button> </p>
					
				</>
			);
		}
	}
	
	/**
	 * Determines the map's current location and, if a location has been assigned, 
	 * returns that location or, if not assigned, returns the default location.
	 * @returns {position} - current location on map
	 */
	GetPosition() {
		if (this.state.position) {
			return this.state.position;
		} else {
			return defaultCenter;
		}
	}

	setPosition(x,y){

	}
	
	/**
	 * Assigns a mark to a location on the map by first identifying the store's location
	 * and then labelling it.
	 * @returns {HTML} - code to display markers to pinpoint locations on map
	 */
	GenerateMarkers() {
		if (this.state.stores) {
			const stores = this.state.stores;
			return (<>{stores.map((store, index) =>
                <Marker 
					position={{lat: store.latittude, lng: store.longitude}} 
					label={(index+1).toString()}
				/>
            )}</>);
		} else {
			return (<></>);
		}
	}

	/**
	 * Displays Google Maps API page. Text input boxes are positioned on the left
	 * of the page while the map itself is positioned on the right.
	 * @returns {HTML} - code displaying Google Maps API page
	 */
	render() {
	
		const mapStyles = {
			height: "100vh",
			width: "60%"
		};
		
		return (
		<Mainlayout>
			<div className="textSide" style={{marginBottom:'20px'}}>
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