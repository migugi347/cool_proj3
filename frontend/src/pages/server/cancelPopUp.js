import React from 'react'

const popUp = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(187, 237, 210)',
    color: 'rgb(0, 38, 25)',
    zIndex: 1,
    padding: '50px'
}

const darkenBackground = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1
}

/**
 * Pop-up that displays that an order has been successfully cancelled.
 * @param {boolean} open - determines whether pop-up will opened or closed
 * @param {HTML} children - elements to be displayed by the pop-up
 * @param {function} onClose - stops displaying pop-up when closed
 * @returns {HTML} - HTML code displaying pop-up
 */
function CancelPopUp({ open, children, onClose}) {
    if(!open){
        return null
    }
    return (
        <>
            <div style={darkenBackground}>
            </div>
            <div style={popUp}>
                <div>{children}</div>
                <button className="btn1" onClick={onClose}>New Order!</button>
            </div>
        </>
    )
}

export default CancelPopUp;