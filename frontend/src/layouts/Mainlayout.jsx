import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Logo from './images/SB_logo.png';
import { ChromePicker } from 'react-color'
import "../style.scss"
import Dropdown from 'react-bootstrap/Dropdown';

function Mainlayout({ children }) {


    const [account, setAccount] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem("user") !== null) {

            const loggedInUser = localStorage.getItem("user")
            setAccount(loggedInUser);
            console.log(loggedInUser)

        }
    }, []);





    function handleSignOut(event) {
        setAccount({});
        localStorage.setItem('user', null);
        navigate("/", { replace: true });
    }
    // const google = window.google;
    // useEffect(() => {
    //     var addScript = document.createElement('script');
    //     addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    //     document.body.appendChild(addScript);
    //     window.googleTranslateElementInit = googleTranslateElementInit;
    // }, [])

    // const googleTranslateElementInit = () => {
    //     new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    // }
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: 'ar,en,es,jv,ko,pa,pt,ru,zh-CN',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
            "google_translate_element"
        );
    };
    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    const [color, setColor] = useState('#fff')
    const [showColorPicker, setShowColorPicker] = useState(false)

    const colorchange = (newcolor) => {
        let root = document.querySelector('body');
        root.style.setProperty('background-color', newcolor);
    };

    return (
        <div>
            <header>
                <nav className='navbar navbar-light bg-primary mb-2'>
                    < div className="container-fluid">
                        <div style={{}}>
                            <img style={{ width: "15%", height: "15%" }} src={Logo} alt="starbucks_logo" />
                            <Link to="/home" className="navbar-brand text-light" style={{ fontWeight: 800 }}>    STARBUCKS</Link>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Link to='/' className='btn btn-secondary' style={{ marginLeft: "10px" }}>Locate Store</Link>


                            {account !== null && <div id="login-btn" className='btn btn-secondary' style={{ marginLeft: "10px", marginRight: "10px" }}>Hello, {account}</div>
                            }
                            {account !== null &&
                                <button onClick={(e) => handleSignOut(e)} className='btn btn-secondary' style={{ marginLeft: "10px", marginRight: "10px" }} >Log Out</button>
                            }


                            <div id="google_translate_element"></div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#eac784', color: "#000000", marginLeft: "10px" }}>Settings</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item >
                                        <button className='btn btn-secondary' style={{ width: '200px' }} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                                            {showColorPicker ? 'Close Color Changer' : 'Change Background'}
                                        </button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </div>

                </nav>
                <div style={{ float: 'right' }}>
                    {showColorPicker && (
                        <ChromePicker
                            color={color}
                            onChange={updatedColor => colorchange(updatedColor.hex)}
                        />
                    )}
                </div>

            </header>
            <main>
                <div className='container mt-3 mb-5'>
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