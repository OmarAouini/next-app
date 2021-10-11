import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Link from 'next/link'

export default function LoginForm(props) {

    const [loginForm, setLoginForm] = useState({email: "", password : ""})

    const handlechange = (event) => {
        setLoginForm(prevState => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(loginForm)
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            }
        }).then(data => {
            console.log("logged out");
        });
    }
    
    return (
        <Container fluid className="login-form-container">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
            <Form.Group>
            <Link as="/signup" href="/signup" passHref>
                <a>new user? create a new account</a>
            </Link>
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Container>
    )
};
