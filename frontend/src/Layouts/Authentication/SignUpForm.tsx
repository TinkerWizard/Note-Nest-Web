import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignUpForm: React.FC<{}> = () => {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const navigate = useNavigate();
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSignInNavigation = () => {
        navigate('/signin');
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, email, password })
            });
            const data = await response.json();

            if (response.ok) {
                // Handle successful response (e.g., navigate to dashboard, store token)
                console.log('Sign Up successful:', data);
                navigate(`/notes/${username}`);

            } else {
                // Handle errors (e.g., invalid credentials)
                console.log('Signup failed:', data.message);
                setEmailError(data.emailError);
                setUsernameError(data.usernameError);
            }
        } catch (error: any) {
            console.log("The Error:", error);
        }
    }
    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block">
                <div className="d-flex justify-content-center align-items-center flex-column vh-100">
                    <Form className="container text-white" style={{ width: '30%' }}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" onChange={handleNameChange} value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
                            <Form.Text className="text-light">
                                {emailError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} value={username} />
                            <Form.Text className="text-light">
                                {usernameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        </Form.Group>
                        <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="" className="text-light" onClick={handleSignInNavigation}>Have an account?</Button>
                        </div>
                    </Form>

                </div>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">
                <div className="d-flex justify-content-center align-items-center flex-column  vh-100">
                    <Form className="container text-white" style={{ width: '90%' }}>
                        <Form.Group className="" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" onChange={handleNameChange} value={name} />
                        </Form.Group>

                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
                            <Form.Text className="text-light">
                                {emailError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} value={username} />
                            <Form.Text className="text-light">
                                {usernameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        </Form.Group>
                        <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="" className="text-light" onClick={handleSignInNavigation}>Have an account?</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
