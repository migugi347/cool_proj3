import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Mainlayout from "../../layouts/Mainlayout";




export default function CustomerLogin(props) {



    const [authMode, setAuthMode] = useState("signin");
    const [email, setEmail] = useState("");
    const [account, setAccount] = useState([]);

    const navigate = useNavigate();

    function handleCallbackResponse(response) {
        console.log(response)
        var userObject = jwt_decode(response.credential);
        console.log(userObject);

        setEmail(userObject.email);
        setAccount(userObject);

        localStorage.setItem('user', userObject);

    }

    useEffect(() => {
        (async () => {
            try {
                axios.get("http://localhost:3001/getAccountType", { params: { email: email } }).then((response) => {
                    setAccount(response.data);
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
            callback: handleCallbackResponse,
            ux_mode: "redirect",


        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline",
                width: 300,
                size: "large"
            }
        );

    }, []);





    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (account.length === 0)
            switchLogin();
        else if (account[0].type === "manager")
            navigate("/menu", { replace: true });
        else if (account[0].type === "server")
            navigate("/server", { replace: true });
        else
            navigate("/home", { replace: true });
    };

    const switchLogin = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }


    if (authMode === "signin") {
        return (
            <Mainlayout className=" align-items-center   ">

                <div className="login-form-cont " >

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
                                <Button size="md" className="d-grid gap-2 mt-4 mb-2 btn-block bg-primary text-white" type="submit" style={{ fontWeight: 800 }}>
                                    SUBMIT
                                </Button>
                                <div id="signInDiv" ></div>
                                <Link to='/home' className='btn btn-primary'> START ORDER</Link>
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

            <div className="login-form-cont" >

                <Form className="auth-form" onSubmit={onSubmitHandler}>
                    <div className="auth-form-content">
                        <h3 >Sign Up</h3>

                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                className="form-control mt-1"
                                placeholder="First and Last Name"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="name@email.com"
                                required
                            />
                        </div>
                        <div className="form-group mt-3 text-le">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <Button size="md" className="d-grid gap-2 mt-4 mb-3 btn-block bg-primary text-white" type="submit" style={{ fontWeight: 800 }}>
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