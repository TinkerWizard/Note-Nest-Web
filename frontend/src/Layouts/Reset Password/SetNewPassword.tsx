import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
export const SetNewPassword: React.FC<{}> = () => {

    const navigate = useNavigate();
    const { username } = useParams();
    const [password, setPassword] = useState<string>();
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        //send a put request to update the password. find the user using the username
        //if response.ok navigate to login screen
        event.preventDefault();
        const response = await fetch (`http://localhost:5000/users/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        const data = await response.json();
        if(response.ok)
        {
            alert(data.message);
            navigate('/signin');
        }

    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div style={{ width: '100%' }}>
                {/* Desktop */}
                <div className="d-none d-xl-block d-xxl-block text-light" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-center align-items-center flex-column vh-100" style={{ width: '100%' }}>
                        <Form className="text-white container" style={{ width: '30%' }} >
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="string" placeholder="Password" onChange={handlePasswordChange} value={password} />
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Sign In
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                {/* Mobile */}
                <div className="d-block d-sm-none w-100 h-100">
                    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
                        <Form className="container text-white" style={{ width: '90%' }}>
                            <Form.Group className="" controlId="formBasicName">
                                <Form.Label>OTP</Form.Label>
                                <Form.Control type="text" placeholder="Password" onChange={handlePasswordChange} value={password} />
                            </Form.Group>

                            <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}