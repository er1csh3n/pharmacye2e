import React from "react";
import {connect} from "react-redux";
import {addPrescription} from "../actions/prescriptions.action";

class AddPrescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prescription: {
                name: '',
                date: '',
                product: [],
                status: ''
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
        this.props.addPrescription(this.state.prescription,
            res => {
                console.log('added successfully', res);
                this.setState({
                    msg: 'added successfully'
                });
            },
            err => {
                console.log('add failed', err);
                this.setState({
                    msg: 'add failed'
                });
            });
    };

    // addInput =()=> {
    //     const prescription = {...this.state.prescription};
    //     prescription.products.push([]);
    //     this.setState({
    //         prescription: prescription
    //     })
    // };

    connectIndex =(index)=> {
        const prescription = {...this.state.prescription};
        this.setState({
            prescription
        })

    };



    render(){
        console.log(this.state.prescription);
        return (
            <form className="flex-column">
                <div>
                    <label>Date
                    <input className="form-control" type="text"/>
                    </label>
                    <label>Name
                    <input className="form-control" type="text"/>
                    </label>
                    <label>Status</label>
                    <select defaultValue='Pending'>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    {/*<button type="button" onClick={this.addInput}>+Product</button>*/}

                    <div>
                        <label>Product Name</label>
                        <input type="text" onChange={this.connectIndex} />
                        <label>Quantity</label>
                        <input type="text"/>
                    </div>
                    {/*{*/}
                        {/*this.state.prescription.products.map((value,index)=>{*/}
                            {/*return(*/}
                                {/*<div key={index}>*/}
                                    {/*<label>{`Product #${index + 1}`}</label>*/}
                                        {/*<input type="text" onChange={this.connectIndex} />*/}
                                    {/*<label>Quantity</label>*/}
                                        {/*<input type="text" value={this.state.prescription.products[index].qty}/>*/}
                                {/*</div>*/}
                            {/*)*/}
                        {/*})*/}
                    {/*}*/}
                    <button type="submit" onSubmit={this.submit}/>
                </div>
            </form>
        );

    }
}

export default connect(null, {addPrescription})(AddPrescription);
