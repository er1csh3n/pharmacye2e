import React from "react";
import {connect} from "react-redux";
import {editPrescription, getPrescriptions} from "../actions/prescriptions.action";
import Form from "react-bootstrap/Form";
import {Card, Container, ListGroup, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Field, reduxForm} from "redux-form";

class PrescriptionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getDerivedStateFromProps(props) {
        if (props.prescriptions) {
            const id = +props.match.params.id;
            const prescription = props.prescriptions.find(p => p.id === id);
            return {
                prescription: prescription
            };
        } else {
            return null;
        }
    }

    componentDidMount() {
        !this.props.prescriptions && this.props.getPrescriptions(); //if props.products does not exist then getProducts
    }

    submitHandler = (event) => {
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
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Prescription Information</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Date: <br/>{this.state.prescription.purchase_date}</ListGroup.Item>
                            <ListGroup.Item>Customer Name: <br/> {this.state.prescription.user.userDetail.name}</ListGroup.Item>
                            <ListGroup.Item>Current Status: <br/>{this.state.prescription.status.status}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <select className="form-control" onChange={this.changeStatus}>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <Button type="submit" variant="primary" size="md" className="float-right">
                                Change Status
                            </Button>
                        </Form.Group>
                    </Form>
                    <Table>
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
                        <tr>
                            <td>

                            </td>
                        </tr>
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

