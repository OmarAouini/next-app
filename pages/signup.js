import { Col, Container, Row } from "react-bootstrap";
import SignupForm from "../components/signupForm";

export default function Signup({props}) {

    return (
        <Container fluid className="signup-container">
        <Row className="justify-content-center mt-3">
            <Col className="col-4">
                <h1>Signup</h1>
                <SignupForm/>
            </Col>
        </Row>
    </Container>
    )
};