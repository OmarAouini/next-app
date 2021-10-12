import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import { PersonCircle, PersonFill } from 'react-bootstrap-icons'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const TopNavbar = () => {

    const [user, setUser] = useState(null)
    
    const handleLogout = async () => {
        fetch("/api/auth/logout", {
            method: "POST",
        }).then(response => {
            if (response.status === 200) {
                Router.push("/login", "/login")
            } 
        }).catch(err => {
            console.log(err);
        })
    }

    const getUser = async () => {
        fetch("/api/auth/user", {
            method: "POST",
        }).then(response => {
            if (response.status === 200) {
                console.log("ok");
            } 
        })
        .then(user => {
            console.log(user);
        })
        .then(user_json => {
            setUser(user_json)
        })
        .catch(err => {
            console.log(err);
        })
    } 

    //on mount
    useEffect(() => {
        getUser()
        console.log(user);
    }, [])


    return (
        <Navbar bg="dark" variant="dark" className="p-4" sticky="top">
            <Container fluid className="navbar-inner-container text-white">
            <Navbar.Brand href="/"><b>Home</b></Navbar.Brand>
            <Nav className="me-auto d-inline-block">
            <span className="mx-3"><Link as="/employees" href="/employees">Employees</Link></span>
            <span className="mx-3"><Link as="/projects" href="/projects">Projects </Link></span>
            <span className="mx-3"><Link as="/tasks" href="/tasks">Tasks</Link></span>
            </Nav>
            <Nav className="justify-content-end">
            <span>
                <Link as="/login" href="/login" passHref>
                    <a>
                    <PersonFill size={32}/>
                    Login
                    </a>
                </Link>
            </span>
            
            <span>
                <Button variant="success" onClick={() => handleLogout()} >
                    <a>
                    <PersonCircle size={32}/>
                    Logout
                    </a>
                </Button>
            </span>
        
            </Nav>
            </Container>
        </Navbar>
    )
}

export default TopNavbar
