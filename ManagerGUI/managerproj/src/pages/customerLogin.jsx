import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Mainlayout from '../layouts/Mainlayout'


export default function CustomerLogin(props) {


    let [authMode, setAuthMode] = useState("signin");

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate("/home", { replace: true });
    };

    const switchLogin = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }


    if (authMode === "signin") {
        return (
            <Mainlayout className="align-items-center flex-direction-column">

                <div className="login-form-cont" >

                    <Form className="login-form" onSubmit={onSubmitHandler}>
                        <div className="login-form-content">
                            <h3 >Log In</h3>

                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="name@email.com"
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
                                <Button size="md" className="d-grid gap-2 mt-4 mb-3 btn-block bg-primary text-white" type="submit" style={{ fontWeight: 800 }}>
                                    SUBMIT
                                </Button>
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

