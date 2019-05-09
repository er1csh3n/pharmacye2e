import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../actions/auth.action";
import "../Login.css";
import {Button, Card} from "react-bootstrap";
import classNames from 'classnames';
class Login extends React.Component {

    constructor(props) {
        super(props);
        props.initialize({
            username: null,
            password: null
        })
    }


    renderField = (field) => {
        return (
            <div className="form-group">
                <label className="h6">
                    {field.input.name}
                    {/*<input type={type} className="form-control" onChange={field.input.onChange} value={field.input.value}/>*/}
                    <input type={field.type} className="form-control" {...field.input}/> {/*this is syntax sugar for above*/}
                    <p className="text-danger">{field.meta.error}</p>
                </label>
            </div>
        );
    };

    login = (formData) => {
        console.log('logging in', formData);
        this.props.login(formData,
            () => {
                console.log('logged in successfully');
                this.props.history.push('/home');
            })
    };

    render() {
        return (
            <div className="login_bg_image">
            <div className="center_div">
                <Card className={classNames("text-center p-3","h-100")}>
                    <Card.Img style = {{ 'margin-bottom': '10px'}} variant="top" src={require('../images/meijer-wide-logo.jpg')} />
                    <Card.Title className="h1">Login</Card.Title>
                <form className="center_form" onSubmit={this.props.handleSubmit(this.login)}>
                    <Field name="username" component={this.renderField}/>
                    <Field name="password" type="password" component={this.renderField}/>
                    <button className="btn btn-outline-primary">Login</button>
                </form>
                </Card>
            </div>
            </div>
        );
    }
}

function validate(formData){
    console.log(formData);
    let error = {};
    Object.keys(formData).forEach(key =>{
        if (formData[key] ===''){
            error[key] = `${key} cannot be empty.`;
        }
        // else if (formData[key] === )
    });
    return error;
}

export default connect(null,{login})(reduxForm({
    form: 'loginForm',
    validate: validate
})(Login));
