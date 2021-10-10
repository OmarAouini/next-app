import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import { PersonCircle, PersonFill } from 'react-bootstrap-icons'

const TopNavbar = () => {
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
            {true ? <span>
                <Link as="/login" href="/login" passHref>
                    <a>
                    <PersonFill size={32}/>
                    Login
                    </a>
                </Link>
            </span>
            :
            <span>
                <Link as="/logout" href="/logout" passHref>
                    <a>
                    <PersonCircle size={32}/>
                    Logout
                    </a>
                </Link>
            </span>
            }
            </Nav>
            </Container>
        </Navbar>
    )
}

export default TopNavbar
