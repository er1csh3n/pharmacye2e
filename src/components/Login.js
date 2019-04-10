import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../actions/auth.action";

class Login extends React.Component {

    renderField = (field) => {
        return (
            <div className="form-group">
                <label>
                    {field.input.name}
                    {/*<input type={type} className="form-control" onChange={field.input.onChange} value={field.input.value}/>*/}
                    <input type={field.type} className="form-control" {...field.input}/> {/*this is syntax sugar for above*/}
                </label>
            </div>
        );
    };

    login = (formData) => {
        //console.log('logging in', formData)
        this.props.login(formData,
            () => {
                console.log('logged in successfully');
                this.props.history.push('/products');
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.login)}> {/*this will preventDefault automatically using reduxForm*/}
                    <Field name="username" component={this.renderField}/>
                    <Field name="password" type="password" component={this.renderField}/>
                    <button className="btn btn-outline-primary">Login</button>
                </form>
            </div>
        );
    }
}

function validate(formData){
    let error = {};
    Object.keys(formData).forEach(key =>{
        if (formData[key] ===''){
            error[key] = `${key} cannot be empty.`;
        }
    });
    return error;
}

export default connect(null,{login})(reduxForm({
    form: 'loginForm',
    validate: validate
})(Login));
