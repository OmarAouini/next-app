import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/loginForm";

export default function Login() {
    
    return (
        <Container fluid className="login-container">
            <Row className="justify-content-center mt-3">
                <Col className="col-4">
                    <h1>Login</h1>
                    <LoginForm/>
                </Col>
            </Row>
        </Container>
    )
}