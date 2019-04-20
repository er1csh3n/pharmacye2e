import React from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
const Header = () => {
    return(
        <header>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Meijer Pharmacies</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/home">Home</NavLink>
                        <NavDropdown title="Inventory" id="collapsible-nav-dropdown">
                            <NavLink style={{color:"black"}} className="nav-link" to="/products">All Products</NavLink>
                            <NavDropdown.Divider/>
                            <NavLink style={{color:"black"}} className="nav-link" to="/add-product">Add Product</NavLink>
                        </NavDropdown>

                        <NavLink className="nav-link" to="/analytics">Analytics</NavLink>
                        <NavDropdown title="Prescriptions" id="collapsible-nav-dropdown">
                            <NavLink style={{color:"black"}} className="nav-link" to="/add-prescription">Add Prescription</NavLink>
                            <NavDropdown.Divider/>
                            <NavLink style={{color:"black"}} className="nav-link" to="/prescriptions">All</NavLink>
                            <NavLink style={{color:"black"}} className="nav-link" to="/prescriptions/pending">Pending</NavLink>
                            <NavLink style={{color:"black"}} className="nav-link" to="/prescriptions/processing">Processing</NavLink>
                            <NavDropdown.Divider />
                            <NavLink style={{color:"black"}} className="nav-link" to="/prescriptions/completed">Completed</NavLink>
                            <NavLink style={{color:"black"}} className="nav-link" to="/prescriptions/cancelled">Cancelled</NavLink>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </Nav>
                </Navbar>
        </header>
    );
};


export default Header;

