import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ResetPassword: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [usernameError, setUsernameError] = useState<string>();

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const [OTP, setOTP] = useState<string>();
    const [OTPError, setOTPError] = useState<string>();
    const handleOTPChange = (event: any) => {
        setOTP(event.target.value);
    };
    const handleOTPSubmit = async (event: any) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/reset/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, OTP})
        });
        const data = await response.json();
        if(response.ok)
        {
            alert(data.message);
            navigate(`/set-password/${username}`);
        }
        else
        {
            alert("Password reset unsuccessful");
        }
    };
    const [showResetArea, setShowResetArea] = useState<boolean>(true);
    const [showOTPArea, setShowOTPArea] = useState<boolean>();
    const handleResetSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/reset/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();
            if (response.ok) {
                setShowResetArea(false);
                setShowOTPArea(true);
            }
            else {
                setUsernameError(data.error);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            {
                showResetArea
                &&
                <div style={{width: '100%'}}>
                    {/* Desktop */}
                    <div className="d-none d-xl-block d-xxl-block text-light" style={{width: '100%'}}>
                        <div className="d-flex justify-content-center align-items-center flex-column vh-100" style={{width: '100%'}}>
                            <Form className="text-white container" style={{ width: '30%' }} >
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} value={username} />
                                    <Form.Text className="text-light">
                                        {usernameError}
                                    </Form.Text>
                                </Form.Group>

                                <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                                    <Button variant="primary" type="submit" onClick={handleResetSubmit}>
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
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} value={username} />
                                    <Form.Text className="text-light">
                                        {usernameError}
                                    </Form.Text>
                                </Form.Group>

                                <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                                    <Button variant="primary" type="submit" onClick={handleResetSubmit}>
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            }
            {
                showOTPArea
                &&
                <div style={{width: '100%'}}>
                {/* Desktop */}
                <div className="d-none d-xl-block d-xxl-block text-light" style={{width: '100%'}}>
                    <div className="d-flex justify-content-center align-items-center flex-column vh-100" style={{width: '100%'}}>
                        <Form className="text-white container" style={{ width: '30%' }} >
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>OTP</Form.Label>
                                <Form.Control type="string" placeholder="OTP" onChange={handleOTPChange} value={OTP} />
                                <Form.Text className="text-light">
                                    {OTPError}
                                </Form.Text>
                            </Form.Group>

                            <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                                <Button variant="primary" type="submit" onClick={handleOTPSubmit}>
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
                                <Form.Control type="text" placeholder="OTP" onChange={handleOTPChange} value={OTP} />
                                <Form.Text className="text-light">
                                    {OTPError}
                                </Form.Text>
                            </Form.Group>

                            <div className="d-flex flex-column justify-content-evenly gap-3 my-3">
                                <Button variant="primary" type="submit" onClick={handleOTPSubmit}>
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
