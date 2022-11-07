import React from 'react'

function server_homescreen() {
  return (
    <div>
        <header>
            <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-success">
                <a href = "#" className = "navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                    width = "80" height = "80" />
                </a>
                <div className= "collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href="#" className="nav-link">
                                Home
                            </a>
                        </li>
                    </ul>
                </div> 
            </nav>
        </header>
        <main>
            
        </main>
    </div>
  )
}

export default server_homescreen