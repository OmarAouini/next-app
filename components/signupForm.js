import { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import Link from 'next/link'

export default function SignupForm(props) {

    const [signupForm, setSignupForm] = useState({username: "", email: "", password : ""})
    const [confirmPass, setConfirmPass] = useState("")
    const [showError, setShowError] = useState(false)

    console.log(signupForm.password);
    console.log(confirmPass);

    const handlechange = (event) => {
        setSignupForm(prevState => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    const handleConfirmPassword = (event) => {
        setConfirmPass(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (signupForm.password === confirmPass) {
            fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(signupForm)
            }).then(response => {
                if (response.status === 201) {
                    console.log(response)
                }
            })
        } else {
            setShowError(true)
        }
    }
    
    return (
        <Container fluid className="signup-form-container">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter username" onChange={handlechange}/>
                <Form.Text className="text-muted">
               insert your username
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" onChange={handlechange}/>
                <Form.Text className="text-muted">
                Well never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={handlechange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleConfirmPassword} />
            </Form.Group>
            <Form.Group>
            <Link as="/login" href="/login" passHref>
                <a>have an account? go to login</a>
            </Link>
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            
            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Header>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm Password does not match!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowError(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
};
