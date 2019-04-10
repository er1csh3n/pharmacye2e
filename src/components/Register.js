import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Register extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = { validated: false };
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        return (
            <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                        />
                        <Form.Control.Feedback>Username is taken/not valid</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First Name Last Name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                        />
                        <Form.Control.Feedback>Must enter password</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomEmail">
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Email Address"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid email/email already in use
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                        />
                        <Form.Control.Feedback>Password</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Phone Number" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        );
    }
}

// render(<Register />);

export default Register;
