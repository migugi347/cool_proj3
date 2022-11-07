import React from 'react'
import {Link} from 'react-router-dom'

function server_itemcategoryscreen() {
    return (
        <div>
            <header>
                <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-success">
                    <a
                    href = "#" className= "navbar-brand">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                        width = "80" height = "80" />
                    </a>
                    <Link to="/" className="navbar-brand">
                        POS
                    </Link>
                </nav>
            </header>
        </div>
      )
}

export default server_itemcategoryscreen