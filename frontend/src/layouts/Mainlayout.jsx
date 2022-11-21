import React, {useState,useEffect} from "react";
import { Link } from 'react-router-dom'
import Logo from './images/SB_logo.png';
import { ChromePicker } from 'react-color'
import "../style.scss"

function Mainlayout({ children }) {
    // const [account, setAccount] = useState([]);
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {

    //         setAccount(foundUser);
    //     }
    // }, []);

    const google = window.google;
    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, [])

    const googleTranslateElementInit = () => {
        new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
    }


    const [color, setColor] = useState('#fff')
    const [showColorPicker, setShowColorPicker] = useState(false)

    const colorchange = (newcolor) =>{
        let root = document.querySelector('body');
        root.style.setProperty('background-color',newcolor);
    };

    return (
        <div>
            <header>
                <nav className='navbar navbar-light bg-primary'>
                    < div className="container-fluid">
                        <div>
                            <img style={{ width: "15%", height: "15%" }} src={Logo} alt="starbucks_logo" />
                            <Link to="/" className="navbar-brand text-light" style={{ fontWeight: 800 }}>    STARBUCKS</Link>
                        </div>
                        <div > <div id="google_translate_element"></div>  </div>
                    </div>
                    <button className='btn btn-secondary' onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                        {showColorPicker ? 'Close' : 'Pick a color'}
                    </button>
                    {showColorPicker && (
                        <ChromePicker
                        color={color}
                        onChange={updatedColor => colorchange(updatedColor.hex)}
                        />
                    )}
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

export default Mainlayout