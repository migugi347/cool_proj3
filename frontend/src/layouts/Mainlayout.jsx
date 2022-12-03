import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Logo from './images/SB_logo.png';
import { ChromePicker } from 'react-color'
import "../style.scss"
import Dropdown from 'react-bootstrap/Dropdown';

function Mainlayout({ children }) {


    const [account, setAccount] = useState([]);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {

            setAccount(loggedInUser);
        }
    }, []);

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
    const [highContrast, setHighContrast] = useState(false)

    const colorchange = (newcolor) => {
        let root = document.querySelector('body');
        root.style.setProperty('background-color', newcolor);
    };

    const changeContrast = (x) =>{
        console.log(highContrast);
        const root = document.querySelector(':root');
        const body = document.querySelector('body');
        setHighContrast(highContrast => !highContrast)
        if(!highContrast && x==1){
            root.style.setProperty('--primary', 'green');
            root.style.setProperty('--secondary', 'pink');
            body.style.setProperty('background-color','yellow')
        }
        if(highContrast && x==1){
            root.style.setProperty('--primary', 'black');
            root.style.setProperty('--secondary', 'yellow');
            body.style.setProperty('background-color','pink')
        }
        if(x==2){
            root.style.setProperty('--primary', '#00704A');
            root.style.setProperty('--secondary', '#eac784');
            body.style.setProperty('background-color','white')
        }
    };

    return (
        <div>
            <header>
                <nav style={{backgroundColor:'var(--primary)'}} className='navbar navbar-light mb-2'>
                    < div className="container-fluid">
                        <div style={{}}>
                            <img style={{ width: "15%", height: "15%" }} src={Logo} alt="starbucks_logo" />
                            <Link to="/home" className="navbar-brand text-light" style={{ fontWeight: 800 }}>    STARBUCKS</Link>
                        </div>
                            <div style={{display:"flex"}}>
                            <Link to='/' className='btn1' style={{marginLeft:"10px", backgroundColor:'var(--secondary)', color:'black'}}>Locate Store</Link>
                            <Link to='/' className='btn1' style={{backgroundColor: 'var(--secondary)', color:"black", marginLeft:"10px", marginRight:"10px"}}>Login</Link>
                            <div id="google_translate_element"></div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'var(--secondary)', color:"black", marginLeft:"10px"}}>Settings</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item >
                                        <button className='btn1' style={{width:'200px'}} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                                            {showColorPicker ? 'Close Color Changer' : 'Change Background'}
                                        </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item >
                                        <button className='btn1' style={{width:'200px'}} onClick={() => changeContrast(1)}>
                                            {highContrast ? 'High Contrast' : 'Low Contrast'}
                                        </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item >
                                        <button className='btn1' style={{width:'200px'}} onClick={() => changeContrast(2)}>
                                            Original Color Scheme
                                        </button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        
                    </div>
                   
                </nav>
                <div style={{float:'right'}}>
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
                <nav  style={{backgroundColor:'var(--primary)'}} className=' navbar fixed-bottom'>
                    
                </nav>
            </div>
        </div>
    )
}

export default Mainlayout