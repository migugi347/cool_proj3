import React from 'react'
import { Link } from 'react-router-dom'
import Mainlayout from '../layouts/Mainlayout'

function homepage() {
    return (
        <Mainlayout>

            <div className='bg-light p-5 mt-4 rounded-5 '>
                <h1>StarBucks Self Check-out</h1>

                <Link to='/pos' className='btn btn-primary'> START ORDER</Link>
            </div>

        </Mainlayout>
    )
}

export default homepage