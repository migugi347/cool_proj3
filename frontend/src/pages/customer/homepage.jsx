import React from 'react'
import { Link } from 'react-router-dom'
import Mainlayout from '../../layouts/Mainlayout'
import home1 from '../../layouts/images/home1.png'
import home2 from '../../layouts/images/home2.png'
import home3 from '../../layouts/images/home3.png'
import home4 from '../../layouts/images/home4.png'
import instagram from '../../layouts/images/instagram.png'
import twitter from '../../layouts/images/twitter.png'
import facebook from '../../layouts/images/facebook.png'
import youtube from '../../layouts/images/youtube.png'
import Magnifier from "react-magnifier";

/**
 * Page that welcomes customer to web application by displaying their name, 
 * advertisements and company information, and giving them the option to begin
 * their order.
 * @returns {HTML} - code displaying customer home page
 */
function homepage() {
    let x = window.localStorage.getItem('name');
    return (
        <Mainlayout>

            <div className='bg-light p-5 mt-4 rounded-5 '>
                <h2>WELCOME {x}!</h2>
                <h1>Starbucks Self Check-out</h1>

                <Link to='/pos' className='btn1'> START ORDER</Link>
            </div>
            <div>
                <Magnifier style={{width:'84vw', marginTop:'15px'}} src ={home1}></Magnifier>
                <Magnifier style={{width:'84vw', marginTop:'15px'}} src ={home2}></Magnifier>
                <Magnifier style={{width:'84vw', marginTop:'15px'}} src ={home3}></Magnifier>
                <Magnifier style={{width:'84vw', marginTop:'15px'}} src ={home4}></Magnifier>
            </div>
            <div style={{textAlign:'center', display:'flex',marginTop:'50px'}}>
                <p>*Excludes taxes and gratuities. At participating stores. Some restrictions apply. 
                    150 Stars deposited after first qualifying Starbucks purchase. Flights purchased close to 
                    departure may not earn double Stars. Stars may not be earned on purchases of alcohol, 
                    Starbucks Cards and Starbucks Card reloads. For details, visit deltastarbucks.com/terms.</p>
            </div>
            <ul style={{  height: '100%', width: '100%',display: 'flex',justifyContent: 'center', alignItems: 'center', marginTop:'7vh',marginBottom:'-20vh'}}>
                <a href='https://www.instagram.com/starbucks/'><img src = {instagram} className='footerImage'></img></a>
                <a href='https://www.facebook.com/Starbucks/'><img src = {facebook} className='footerImage'></img></a>
                <a href='https://twitter.com/starbucks/'><img src = {twitter} className='footerImage'></img></a>
                <a href='https://www.youtube.com/@starbucks/featured'><img src = {youtube} className='footerImage'></img></a>
            </ul>
        </Mainlayout>
    )
}

export default homepage