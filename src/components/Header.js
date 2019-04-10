import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
const Header = () => {
    return(
        <header>
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Brand>Meijer Pharmacies</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Inventory" href="#products" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="products">All Products</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="add-product">Add Product</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="analytics">Analytics</Nav.Link>
                        <NavDropdown title="Prescriptions"  href="#prescriptions" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="prescriptions">All</NavDropdown.Item>
                            <NavDropdown.Item href="pending">Pending</NavDropdown.Item>
                            <NavDropdown.Item href="processing">Processing</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="completed">Completed</NavDropdown.Item>
                            <NavDropdown.Item href="cancelled">Cancelled</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};


export default Header;

