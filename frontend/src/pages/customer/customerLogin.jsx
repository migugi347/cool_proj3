import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Mainlayout from "../../layouts/Mainlayout";
import { API_URL } from "../../API";


/**
 * Displays the login page for the web application. Furthermore, allows users
 * to login in using OAUTH login or a regular account (using email and password). Also, allows
 * users to create an account if necessary and allows managers and servers
 * to login into their respective systems. All account information is stored in the
 * system's database.
 * @param {HTML} props - elements to be displayed by the login page
 * @returns {HTML} - code displaying the login page
 */
function CustomerLogin(props) {



    const [authMode, setAuthMode] = useState("signin");
    const [email, setEmail] = useState("");
    const [account, setAccount] = useState([]);

    const navigate = useNavigate();

    const [upemail, setUpEmail] = useState("");
    const [upname, setUpName] = useState("");
    const [uppass, setUpPass] = useState("");
    const [tempname,setTempName] = useState("");

    useEffect(() => {
        (async () => {
            try {
                axios.get(API_URL + "/getAccountType", { params: { email: email } }).then((response) => {
                    setAccount(response.data[0].type);
                    setTempName(response.data[0].name);
                    localStorage.setItem('type',response.data[0].type);
                    //console.log(tempname);
                });
            } catch (error) {
                console.log('error');
            }
        })();
    }, [email]);

    useEffect(() => {
        /* global google  */
        google.accounts.id.initialize({
            client_id: "704019936455-s2sdsnf3jc47qljoduocgo6ufla51qbn.apps.googleusercontent.com",
            callback: handleCallbackResponse


        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline",
                width: 300,
                size: "large"
            }
        );

        function handleCallbackResponse(response) {

            var userObject = jwt_decode(response.credential);

            setEmail(userObject.email);
            setAccount(userObject);

            localStorage.setItem('user', JSON.stringify(userObject));
            localStorage.setItem('name',userObject.name);

            navigate("/home", { replace: true });
        }

    }, [navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('name',tempname);
        localStorage.setItem('user',JSON.stringify(tempname));
        if (account.length === 0)
            switchLogin();
        else if (account === "manager")
            navigate("/menu", { replace: true });
        else if (account === "server")
            navigate("/server", { replace: true });
        else
            navigate("/home", { replace: true });
    };

    const switchLogin = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const signUp = () => {
        axios.post(API_URL+"/signup",{
            upname: upname,
            upemail: upemail,
            uppass: uppass
        }); 
    }


    if (authMode === "signin") {
        return (
            <Mainlayout className=" align-items-center   ">

                <script src="https://accounts.google.com/gsi/client" async defer></script>
               

                <div className="login-form-cont " style={{backgroundColor:'white'}}>


                    <Form className="login-form " onSubmit={onSubmitHandler}>
                        <div className="login-form-content">
                            <h3 >Log In</h3>

                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="name@email.com"
                                    onChange={(e) => { setEmail("" + e.target.value); }}
                                    required
                                />
                            </div>
                            <div className="form-group mt-3 ">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <Button size="md" className="d-grid gap-2 mt-4 mb-2 btn-block text-white" type="submit" style={{ fontWeight: 800,backgroundColor:'var(--primary)'}}>
                                    SUBMIT
                                </Button>
                                <div id="signInDiv" ></div>
                            </div>
                            <div className="text-center">
                                Dont Have an Account?{" "}
                                <span className="link-primary" onClick={switchLogin}>
                                    Sign Up
                                </span>
                            </div>


                        </div>
                    </Form>
                </div>

            </Mainlayout>
        )
    }

    return (
        <Mainlayout>

            <div className="login-form-cont"  style={{backgroundColor:'white'}}>

                <Form className="auth-form" onSubmit={onSubmitHandler}>
                    <div className="auth-form-content">
                        <h3 >Sign Up</h3>

                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                className="form-control mt-1"
                                placeholder="First and Last Name"
                                required
                                onChange = {(e)=>{setUpName(e.target.value);}}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="name@email.com"
                                required
                                onChange = {(e)=>{setUpEmail(e.target.value);}}
                            />
                        </div>
                        <div className="form-group mt-3 text-le">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                required
                                onChange = {(e)=>{setUpPass(e.target.value);}}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <Button onClick={()=>signUp()} size="md" className="d-grid gap-2 mt-4 mb-3 btn-block bg-primary text-white" type="submit" style={{ fontWeight: 800 }}>
                                SIGN IN
                            </Button>
                        </div>

                        <div className="text-center">
                            Already Have an Account?{" "}
                            <span className="link-primary" onClick={switchLogin}>
                                Sign In
                            </span>
                        </div>
                    </div>
                </Form>
            </div>
        </Mainlayout>
    )
}
export default CustomerLogin