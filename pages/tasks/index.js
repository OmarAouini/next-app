import React from 'react'
import { Container } from 'react-bootstrap'

export default function Tasks({ tasks }) {

    return (
        <Container fluid className="tasks-container">
            <h1>tasks</h1>
        </Container>
    )
}

export async function getServerSideProps(context) {

    return {
        props : {
            tasks : null
        }
    }
}