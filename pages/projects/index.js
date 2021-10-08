import React from 'react'
import { Container } from 'react-bootstrap'

export default function projects(projects) {

    return (
        <Container fluid className="projects-container">
            <h1>projects</h1>
        </Container>
    )
}

export async function getServerSideProps(context) {

    return {
        props : {
            projects : null
        }
    }
}