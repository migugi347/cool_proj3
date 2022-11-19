import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAUTH } from 'react-google-oauth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <GoogleOAUTH clientId="704019936455-s2sdsnf3jc47qljoduocgo6ufla51qbn.apps.googleusercontent.com">
    // onUpdateSigninStatus = { Function }
    //     onInitFailure = { Function } >
    < App />
    {/* </GoogleOAUTH> */ }
);