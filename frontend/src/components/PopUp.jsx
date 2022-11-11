
import React from 'react'
import "../style.scss"
import { Link } from 'react-router-dom'

function PopUp(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className="btn btn-primary close-btn" onClick={() => props.setTrigger(false)}> Back to Order </button>

                {/* <Link to='/pos' className='btn btn-primary'> START ORDER</Link> */}
                <Link to='/home' className='btn btn-primary continue-btn' onClick={() => props.setTrigger(false)}> Continue </Link>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PopUp