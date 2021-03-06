import React from 'react';
import { connect } from "react-redux";
import {addProduct} from "../actions/products.action";
import {Card, Form} from "react-bootstrap";
import '../AddProduct.css';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: '',
                brand: '',
                price: 0,
                stock: 0,
                category: ''
            },
            msg: ''
        };
    }


    updateProduct = (event) => {
        const product = {...this.state.product}; //spread operation for object
        product[event.target.id] = event.target.value;
        this.setState({
            product: product
        });
    };

    submit = (event) => {
        event.preventDefault();
        this.props.addProduct(this.state.product,
            res => {
                console.log('added successfully', res);
                this.setState({
                    msg: 'added item to inventory successfully'
                });
            },
            err => {
                console.log('add failed', err)
                this.setState({
                    msg: 'could not add item'
                });
            });
    };

    render(){
        return (
            <div className="center_div">
            <Card className = "text-center p-3">
                <Card.Title>ADD PRODUCT</Card.Title>
            <Form className="flex-md-column" onSubmit={this.submit}>
                {
                    Object.keys(this.state.product).map(
                        key => (
                            <div key={key}>
                                <label htmlFor={key}>Product {key.charAt(0).toUpperCase()+key.slice(1)}:</label>
                                <input className="form-control" type={key=== 'price' || key === 'stock' ? 'double' : 'text'
                                } id={key} onChange={this.updateProduct}/>
                            </div>
                        )
                    )
                }
                <br/>
                <div>
                    <div className={this.state.msg.indexOf('success')!==-1?'text-success' : 'text-danger'}>{this.state.msg}</div>
                    <button className="btn btn-dark">Submit</button>
                </div>
            </Form>
            </Card>
            </div>
        );

    }

}

export default connect(null, {addProduct})(AddProduct);
