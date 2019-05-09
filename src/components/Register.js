import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {register} from "../actions/auth.action";
import '../Register.css';
import {Alert, Card} from "react-bootstrap";
import classNames from "classnames";

class Register extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            validated: false,
            password: '',
            password2: '',
            show: false
        };
    }
    onUserNameChange = (e) => {
        this.setState({username: e.target.value});
    };
    onPassword1Change = (e) => {
        this.setState({password: e.target.value});
    };
    onPassword2Change = (e) => {
        this.setState({password2: e.target.value});
    };
    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    };
    onPhoneChange = (e) => {
        this.setState({phone: e.target.value});
    };
    onNameChange = (e) => {
        this.setState({name: e.target.value});
    };



    handleSubmit(event) {
        const form = event.currentTarget;
        if(this.state.password !== this.state.password2){
            this.setState({password2: ''});
        }
        if (form.checkValidity() === false) {
            // event.preventDefault();
            // event.stopPropagation();
        }
        this.setState({ validated: true });
        console.log(this.state);
        event.preventDefault();
        event.stopPropagation();
        register(this.state,
            () => {
            console.log('Register successfully');
            setTimeout(() => this.props.history.push('/home'));
            },
            (err) => {
            console.log('Register failed', err);
        });
    }

    render() {
        const handleHide = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        const { validated } = this.state;
        return (
            <div className='bg_image'>
            <div className='center_div'>
                <Card style = {{ 'margin-bottom': '10px'}} className={classNames("text-center p-3","h-100")}>
                    <Card.Img variant="top" src={require('../images/meijer-wide-logo.jpg')} />
                    <Card.Title className="h1">Register</Card.Title>
            <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            onChange={this.onUserNameChange}
                        />
                        <Form.Control.Feedback type="invalid">Username is taken/not valid</Form.Control.Feedback>
                        <Form.Control.Feedback>Username available</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Full Name"
                            onChange={this.onNameChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPassword1Change}
                        />
                        <Form.Control.Feedback>Must enter password</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.password2}
                            onChange={this.onPassword2Change}
                        />
                    <Form.Control.Feedback>Passwords do not match</Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Email Address"
                                onChange={this.onEmailChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid email/email already in use
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            required
                            onChange={this.onPhoneChange}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                <Alert show={this.state.show} variant="success">
                    <Alert.Heading>Terms and Conditions</Alert.Heading>
                    <p className="terms">
                        1. ACKNOWLEDGMENT AND ACCEPTANCE OF TERMS OF SERVICE
                        THIS IS A LEGAL AGREEMENT BETWEEN YOU ("USER" OR "8=D") AND MEIJER INC ("MEIJER"). BY COMPLETING THE REGISTRATION PROCESS, YOU ARE INDICATING YOUR AGREEMENT TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT. The Online Service ("Service") is provided to you ("User") under the following Wondersoft terms ("Terms"). The Terms comprise the entire agreement between User and Wondersoft and supersede all prior agreements between the parties regarding the subject matter contained herein.


                        2. DESCRIPTION OF SERVICE
                        Wondersoft is providing User with a capability to create and convert PDF files. User must: (1) provide all equipment and communications services, including a computer and modem, necessary to establish a connection to the World Wide Web and (2) provide for own access to the World Wide Web and pay any connection and service fees associated with such access. In consideration for this Service, User agrees to: (1) provide certain current, complete, and accurate information about User as prompted to do so by the Service and (2) maintain and update this information as required to keep it current, complete and accurate. All information requested on original sign up shall be referred to as registration Information ("Registration Information"). Wondersoft will maintain Registration Information in accordance with these Terms and then current PDF Copy Paste privacy policy, available at http://www.pdfcopypaste.com/privacy.html. Should there be any conflict between these Terms and Wondersoft's privacy policy, these Terms shall supersede the privacy policy. You authorize a recurring monthly or annual charge to your credit card in exchange for use of the Wondersoft service as indicated by published standard plans or a customized quote provided for your specific use. You also agree that the enrollment for the next service period is automatic. Please note that refunds on a pro-rated basis are issued only for yearly plans. When yearly subscriptions are cancelled before the subscriptions end, refunds are issued based on a pro-rated calculation of the subscription charges at the monthly rate for the plan, for the actual number of months the account was subscribed (the number of months between the most recent yearly charges and the cancellation date). If the calculated refund amount exceeds the yearly subscription rate, then no refund is issued.
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleHide} variant="outline-success">
                            Exit
                        </Button>
                    </div>
                </Alert>
                {!this.state.show && <Button onClick={handleShow}>Show Terms and Conditions</Button>}
                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
                </Card>
            </div>
            </div>
        );
    }
}

// render(<Register />);

export default connect(null, {register})(reduxForm({
    form: 'registerForm'
})(Register));
