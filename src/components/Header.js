import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import "../Header.css";
import {logout} from "../actions/auth.action.js"
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
const Header = (props) => {

    return(
        <header>
            <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                <Navbar.Brand>
                    <img
                        src={require('../images/meijer-wide-logo.jpg')}
                        width="150"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse aria-controls="basic-navbar-nav" className="mr-auto">
                        <NavLink className="nav-link" to="/home"><img
                            src={require('../images/home.png')}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Home"
                        /></NavLink>
                        <NavDropdown title={<img
                            src={require('../images/inventory.png')}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Inventory"
                        />} id="collapsible-nav-dropdown">
                            <NavLink style={{color:"black"}} className="nav-link" to="/products">Inventory</NavLink>
                            <NavDropdown.Divider/>
                            <NavLink style={{color:"black"}} className="nav-link" to="/add-product">Add Item</NavLink>
                        </NavDropdown>

                        <NavLink className="nav-link" to="/analytics"><img
                            src={require('../images/analytics.png')}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Inventory"
                        /></NavLink>
                        <NavDropdown title={<img
                            src={require('../images/prescription.png')}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Prescription"
                        />} id="collapsible-nav-dropdown">
                            <NavLink style={{color:"black"}} className="nav-link" to="/prescriptions">Prescriptions</NavLink>
                            <NavDropdown.Divider/>
                            <NavLink style={{color:"black"}} className="nav-link" to="/add-prescription">Add Prescription</NavLink>
                        </NavDropdown>
                        <Nav className="ml-auto">
                            <NavLink className="nav-link" to="/login">
                                {!props.loggedIn &&
                                    (<img
                                        src={require('../images/login.png')}
                                        width="40"
                                        height="40"
                                        className="d-inline-block align-top"
                                        alt="Login"
                                    />) ||
                                    (< img
                                        src={require('../images/logout.png')}
                                        width="40"
                                        height="40"
                                        className="d-inline-block align-top"
                                        alt="Inventory"
                                    />)
                                }
                            </NavLink>
                            <NavLink className="nav-link" to="/register">
                                <img
                                    src={require('../images/register.png')}
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top"
                                    alt="Register"
                                />
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                {/*{*/}
                    {/*!this.props.loggedIn?*/}
                        {/*<Button variant="outline-info" href="/login">Log in</Button>:*/}
                        {/*<Button variant="outline-info" onClick={this.onLogOut}>Log out</Button>*/}
                {/*}*/}
            </Navbar>
        </header>
    );
};

const onLogOut = () =>{

};


const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
};

export default connect(mapStateToProps,{logout})(Header);

