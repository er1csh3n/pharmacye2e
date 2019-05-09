import React from "react";
import {connect} from "react-redux";
import {editPrescription, getPrescriptions} from "../actions/prescriptions.action";
import Form from "react-bootstrap/Form";
import {Card, Container, ListGroup, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";
import '../PrescriptionDetail.css';


class PrescriptionDetail extends React.Component {
    statusChanged = false;
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getDerivedStateFromProps(props) {
        if (props.prescriptions) {
            const id = +props.match.params.id;
            const prescription = props.prescriptions.find(p => p.id === id);
            console.log(props.prescriptions);
            return {
                prescription: prescription
            };
        } else {
            return null;
        }
    }

    componentDidMount() {
        !this.props.prescriptions && this.props.getPrescriptions(); //if props.products does not exist then getProducts
        console.log(this.props.prescription);
    }

    shouldComponentUpdate() {
        return !this.statusChanged;
    }

    submitHandler = (event) => {
        this.statusChanged = false;
        event.preventDefault();
        console.log(this.state.prescription);
        this.props.editPrescription(this.state.prescription, this.state.prescription.id, (res) => {
            if (res.data && res.data.success) {
                this.setState({
                    message: 'Status is changed.'
                });
            } else {
                this.setState({
                    message: 'Status cannot be changed.'
                });
            }
        });

    };

    calcTotal = () => {
        let totalPrice = 0;
        this.state.prescription.purchases.forEach((p)=>{

            totalPrice += p.product.price * p.qty;
        });
        return totalPrice.toFixed(2);
    };

    changeStatus = (event) => {
        console.log(event.target.value);
        this.statusChanged = true;
        const prescription = {...this.state.prescription};
        prescription.status.status = event.target.value;
        this.setState({
            prescription: prescription
        });
        console.log('set', prescription);
    };


    render() {
        return(
            <div>
                {this.state.prescription && <Container>
                    <br/>
                    <br/>
                    <div className="position">
                    <Card style={{ width: '18rem', margin: ' 0 20px 20px 0' }}>
                        <Card.Header>Prescription Information</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Date: <br/>{this.state.prescription.purchase_date}</ListGroup.Item>
                            <ListGroup.Item>Customer Name: <br/> {this.state.prescription.user.userDetail.name}</ListGroup.Item>
                            <ListGroup.Item>Current Status: <br/>{this.state.prescription.status.status}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Form style={{ margin: ' 0 0 0 20px' }} onSubmit={this.submitHandler}>
                        <Form.Group>
                            <Form.Label><h4>Change Status</h4></Form.Label>
                            <select className="form-control" onChange={this.changeStatus}>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <br/>
                            <div className="button_position">
                            <Button type="submit" variant="primary" size="md">
                                Change Status
                            </Button>
                            </div>
                        </Form.Group>
                    </Form>
                    </div>
                    <Table hover size="md">
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Product Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.prescription.purchases.map(p=>{
                                return (
                                    <tr key = {p.id}>
                                        <td>{p.product.name}</td>
                                        <td>${p.product.price}</td>
                                        <td>{p.qty}</td>
                                        <td>${(p.qty*p.product.price).toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </Table>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>Invoice</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Total Invoice: <br/>${this.calcTotal()}</ListGroup.Item>
                                <ListGroup.Item>Total Invoice with Insurance: ${this.calcTotal()*0.2}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    <br/>
                    <br/>
                    <br/>
                </Container>}
            </div>
        );

    }

}

const mapStateToProps = (state) => {//determines what part of data from store that connected cocmponent needs
    console.log(state.prescriptions);
    return {
        prescriptions: state.prescriptions
    }
};


export default connect(mapStateToProps, {getPrescriptions, editPrescription})(
    reduxForm({
        form: 'PrescriptionDetailForm'
    })(PrescriptionDetail)
);

