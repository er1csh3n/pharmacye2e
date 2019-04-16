import React from "react";
import {Field, reduxForm} from "redux-form";
import { connect } from "react-redux";
import {getProducts} from "../actions/products.action";
import Form from "react-bootstrap/Form";
import {editProduct} from "../actions/products.action";

/*class EditProduct extends React.Component {

    componentDidMount() {
        !this.props.products && this.props.getProducts(); //if props.products does not exist then getProducts
    }

    static getDerivedStateFromProps ( props, currentState) {
        if (props.products &&!currentState.product) {
            const id = +props.match.params.id; //match - ReactRouterDom function to look at url params (:id:name, etc)
            const product = props.products.find(p=>p.id ===id);
            props.initialize(product);
            return {
                product: product
            }
        } else {
            return null;
        }
    }

    constructor(props){
        super(props);
        this.state = {
            product: null
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
        this.props.editProduct(this.state.product,
            res => {
                console.log('edited successfully', res);
                this.setState({
                    msg: 'edited successfully'
                });
            },
            err => {
                console.log('edit failed', err)
                this.setState({
                    msg: 'edit failed'
                });
            });
    };

    renderField = (field) => {
        const type = field.input.name === 'price' || field.input.name ==='stock' ? 'number' : 'text';
        return (
            <div className="form-group">
                <label>
                    {field.input.name}
                    <input type={type} className={`form-control ${field.meta.invalid && 'is-invalid'}`} {...field.input} onChange={this.updateProduct}/> {/!*this is syntax sugar for above*!/}
                    <p className="text-danger">{field.meta.error}</p>
                </label>
            </div>
        );
    };

    render() {
        return (
            <div>
                <h2>Edit Product</h2>
                <form onSubmit={this.submit}>
                    {
                        this.state.product && Object.keys(this.state.product).map(
                            key => (
                                <Field name={key} key = {key} component={this.renderField}/>
                            )
                        )
                    }
                    <button className="btn btn-outline-dark">Edit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {products: state.products};
};

function validate(formData){
    let error = {};
    Object.keys(formData).forEach(key =>{
        if (formData[key] ===''){
            error[key] = `${key} cannot be empty.`;
        }
    });
    return error;
}

export default connect(mapStateToProps, {getProducts})(
    reduxForm({
        form: 'EditProductForm',
        validate: validate
    })( EditProduct)
);*/

class EditProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.h2ElemRef = React.createRef();
    }

    componentDidMount() {
        !this.props.products && this.props.getProducts();
    }

    renderField =(field) =>{
        return (
            <div className="form-group">
                <label>
                    {field.label}
                    <input
                        type={field.type}
                        className="form-control"
                        name={field.input.name}
                        disabled={field.input.name === 'id'}
                        {...field.input}
                    />
                </label>
                <p className="text-danger">{field.meta.error}</p>
            </div>
        );
    };

    submitHandler = (editProductFormData) => {
        this.props.editProduct(editProductFormData, (res) => {
            if (res.data && res.data.success) {
                this.setState({
                    message: 'Product is saved.'
                });
            } else {
                this.setState({
                    message: 'Product is not saved.'
                });
            }
        });

    };

    render() {
        return (
            <div className="container">
                <h2 ref={this.h2ElemRef}>Edit Product</h2>
                {/*<p>Product to edit: {JSON.stringify(this.state.editProduct)}</p>*/}
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Field
                        name="id"
                        label="ID"
                        type="number"
                        component={this.renderField}
                    />
                    <Field
                        name="name"
                        label="Name"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        name="brand"
                        label="Brand"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        name="price"
                        label="Price"
                        type="number"
                        component={this.renderField}
                    />
                    <Field
                        name="stock"
                        label="Stock"
                        type="number"
                        component={this.renderField}
                    />
                    <Field
                        name="category"
                        label="Category"
                        type="text"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p>{this.state.message}</p>
                </form>
            </div>
        );
    }

}

function mapStateToProps({products}, componentProps) {
    const product = products ? products.find(p => {
        return p.id === +componentProps.match.params.id;
    }) : null;
    return {
        products,
        initialValues: product
    };
}

function validate(data) {
    let errors = {};

    if (data.name === '') {
        errors.name = 'Name can\'t be empty';
    }

    if (data.brand === '') {
        errors.brand = 'Brand can\'t be empty';
    }

    if (data.price && data.price <= 0) {
        errors.price = 'Price must be larger than 0.';
    }

    return errors;
}

export default connect(mapStateToProps, {getProducts, editProduct})(
    reduxForm({
        form: 'EditProductForm',
        validate: validate
    })(EditProduct)
);
