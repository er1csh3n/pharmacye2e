import React from "react";
import {connect} from "react-redux";
import {addPrescription} from "../actions/prescriptions.action";
import {getProducts} from "../actions/products.action";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../AddPrescription.css';
import axios from "axios";
import Card from "react-bootstrap/Card";

const URL = 'http://localhost:8080/users';
const URL2 = 'http://localhost:8080/products';

class AddPrescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prescription: {
                user: null,
                purchase_date: '',
                purchases: []
            },
            msg: ''
        }
        };


    updatePrescription = (event) => {
        const prescription = {...this.state.prescription}; //spread operation for object
        prescription[event.target.id] = event.target.value;
        this.setState({
            prescription: prescription
        });
    };

    submit = (event) => {
        event.preventDefault();

        console.log('this.state.prescription', this.state.prescription);

        this.props.addPrescription(this.state.prescription,
            res => {
                console.log('added successfully', res);
                //this.setState({
                //    msg: 'added successfully'
                //});
            },
            err => {
                console.log('add failed', err);
                //this.setState({
                //    msg: 'add failed'
                //});
            });
    };



    addInput =()=> {
        const prescription = {...this.state.prescription};
        prescription.purchases.push({});
        this.setState({
            prescription: prescription
        })
    };

    connectIndex(index, event){
        const prescription = {...this.state.prescription};
        const product_id = event.target.value;

        axios.get(`${URL2}/${product_id}`)
            .then(res => {
                console.log(index);
                console.log(prescription);
                    prescription.purchases[index].product = res.data;
                    console.log('connectIndex', prescription);
                    this.setState({
                        prescription: prescription
                    })
                }
            );
    };

    onChangeUser = (id) => {
        console.log(id.target.value);
        const pre = this.state.prescription;
        axios.get(`${URL}/${id.target.value}`)
            .then(res => { //res is not what I need
                console.log('in .then', res);
                pre.user = res.data;

                console.log('pre', pre);
                this.setState({
                    prescription: pre
                })
            });

    };

    onChangeDate = (date) => {
        console.log(date.target.value);
        const pre = this.state.prescription;
        pre.purchase_date = date.target.value;
        this.setState({
            prescription: pre
        });
    };

    onChangeQuantity(index, event){
        console.log(event.target.value);
        const pre = this.state.prescription;
        pre.purchases[index].qty = event.target.value;
        this.setState({
            prescription: pre
        })
    };



    render(){
        console.log(this.state.prescription);
        return (
            <div className="prescription_center_div">
            <Form className="flex-row">
                    <label><img
                        src={require('../images/date.png')}
                        width="60"
                        height="60"
                        className="d-inline-block align-middle"
                        alt="Date"
                        hspace="20"
                    />
                    <input className="form-control-sm" type="text" onChange={this.onChangeDate} />
                    </label>
                    <label><img
                        src={require('../images/name.png')}
                        width="60"
                        height="60"
                        className="d-inline-block align-middle"
                        alt="Date"
                        hspace="20"
                    />
                    <input className="form-control-sm" type="text" onChange={this.onChangeUser}/>
                    </label>
                <Button type="button" onClick={this.addInput}>Add Item</Button>
                <Card>
                    {
                        this.state.prescription.purchases.map((value,index)=>{
                            return(
                                <div key={index} className="prescription_product_div">
                                    <label>{`${index + 1}`}<img
                                        src={require('../images/pill_bottle.png')}
                                        width="55"
                                        height="50"
                                        className="d-inline-block align-middle"
                                        alt="Date"
                                        hspace="20"
                                    /></label>
                                        <input type="text" className="form-control-sm" value={this.state.prescription.purchases[index].id} onChange={this.connectIndex.bind(this, index)} />
                                    <label><img
                                        src={require('../images/multiply.png')}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-middle"
                                        alt="Date"
                                        hspace="20"
                                    /></label>
                                        <input type="text" className="form-control-sm" value={this.state.prescription.purchases[index].qty} onChange = {this.onChangeQuantity.bind(this, index)}/>
                                </div>
                            )
                        })
                    }
                </Card>
                    <label>Status</label>
                    <select defaultValue='Pending'>
                        <option value="1">Pending</option>
                        <option value="2">Processing</option>
                        <option value="3">Completed</option>
                        <option value="4">Cancelled</option>
                    </select>
                    <Button onClick={this.submit}>SUBMIT</Button>
            </Form>
            </div>
        );

    }
}

export default connect(null, {addPrescription})(AddPrescription);
