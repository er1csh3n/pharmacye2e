import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {getPrescriptions} from "../actions/prescriptions.action";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class Prescriptions extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };
    }

    componentDidMount() {
        !this.props.prescriptions && this.props.getPrescriptions(); //if props.products does not exist then getProducts
    }

    render() {
        return (
        <BootstrapTable data = { this.props.prescriptions } options = {this.options}>
            <TableHeaderColumn dataField='id' isKey dataSort filter={ { type: 'TextFilter', delay: 100 } }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='category' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Category</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='qty' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Quantity</TableHeaderColumn>
            <TableHeaderColumn dataField='total' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Total</TableHeaderColumn>
            <TableHeaderColumn dataField='date' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Date</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {//determines what part of data from store that connected cocmponent needs
    console.log(state.prescriptions);
    return {
        prescriptions: state.prescriptions
    }
};

export default connect(mapStateToProps, {getPrescriptions})(Prescriptions);

{/*            <Table bordered striped hover>
                <thead>
                <tr>
                    <th>Prescription ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Purchase ID</th>
                    <th>Purchase Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.prescriptions && this.props.prescriptions.map(pr=>{
                        return (
                            <tr key = {pr.id}>
                                <td>{pr.category}</td>
                                <td>{pr.name}</td>
                                <td>{pr.qty}</td>
                                <td>{pr.price}</td>
                                <td>{pr.stock}</td>
                                <td>{pr.date}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>*/}
