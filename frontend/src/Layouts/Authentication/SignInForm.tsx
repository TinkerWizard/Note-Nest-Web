import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignInForm: React.FC<{}> = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordSuccess, setPasswordSuccess] = useState();
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSignUpNavigation = (event: any) => {
        navigate('/');
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok) {
                // Handle successful response (e.g., navigate to dashboard, store token)
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username??'');
                alert(localStorage.getItem('username'));
                navigate(`/notes/${username}`);

            } else {
                // Handle errors (e.g., invalid credentials)
                setUsernameError(data.usernameError);
                setPasswordError(data.passwordError);
                console.log('Login failed:');
            }
        } catch (error: any) {
            console.log("The Error:", error);
        }
    };

    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block text-light">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <Form className="text-white container" style={{ width: '30%' }}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Name" onChange={handleUsernameChange} value={username} />
                            <Form.Text className="text-light">
                                {usernameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} required />
                            <Form.Text className="text-light">
                                {passwordError}
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Sign In
                            </Button>
                            <Button variant="" className="text-light" onClick={handleSignUpNavigation}>Create an account</Button>
                        </div>
                    </Form>
                </div>
            </div>
            {/* Mobile */}
            <div className="d-block d-sm-none">
                <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                    <Form className="container text-white" style={{ width: '90%' }}>
                        <Form.Group className="" controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Name" onChange={handleUsernameChange} value={username} />
                            <Form.Text className="text-light">
                                {usernameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} required />
                            <Form.Text className="text-light">
                                {passwordError}
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Sign Up
                            </Button>
                            <Button variant="" className="text-light" onClick={handleSignUpNavigation}>Create an account</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}