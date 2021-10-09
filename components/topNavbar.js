import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'

const TopNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid className="navbar-inner-container text-white">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
            <Link as="/employees" href="/employees">Employees </Link>
            <Link as="/projects" href="/projects">Projects </Link>
            <Link as="/tasks" href="/tasks">Tasks</Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default TopNavbar
