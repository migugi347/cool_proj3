import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './images/SB_logo.png';
import "../style.scss"

function mainlayout({ children }) {
    // const [account, setAccount] = useState([]);
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {

    //         setAccount(foundUser);
    //     }
    // }, []);

    return (
        <div>
            <header>
                <nav className='navbar navbar-light bg-primary'>
                    < div className="container-fluid">
                        <div>
                            <img style={{ width: "15%", height: "15%" }} src={Logo} alt="starbucks_logo" />
                            <Link to="/" className="navbar-brand text-light" style={{ fontWeight: 800 }}>    STARBUCKS</Link>
                        </div>
                        <div >   </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className='container mt-3 '>
                    {children}
                </div>

            </main>
            <div>
                <nav className=' navbar fixed-bottom  bg-primary'>

                </nav>
            </div>
        </div>



    )
}

export default mainlayout