import { Nav, Navbar } from "react-bootstrap"

export const NavBarComponent = () => {
    return (
        <>
            <Navbar bg="dark" >
                <Navbar.Brand href="/" className='ms-2 text-white'><strong>Generic restaurant</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/orders" className='text-white'>Orders</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}