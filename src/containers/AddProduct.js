import React from 'react';
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {addProduct} from "../actions/products.action";

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
                    msg: 'added successfully'
                });
            },
            err => {
                console.log('add failed', err)
                this.setState({
                    msg: 'add failed'
                });
            });
    };

    render(){
        return (
            <form className="flex-column" onSubmit={this.submit}>
                {
                    Object.keys(this.state.product).map(
                        key => (
                            <div className="form-group col-sm-6" key={key}>
                                <label htmlFor={key}>Product {key.charAt(0).toUpperCase()+key.slice(1)}:</label>
                                <input className="form-control" type={key=== 'price' || key === 'stock' ? 'number' : 'text'
                                } id={key} onChange={this.updateProduct}/>
                            </div>
                        )
                    )
                }
                <div className="col-sm-2">
                    <div className={this.state.msg.indexOf('success')!==-1?'text-success' : 'text-danger'}>{this.state.msg}</div>
                    <button className="btn btn-dark">Submit</button>
                </div>
            </form>
        );

    }

}

export default connect(null, {addProduct})(AddProduct);
