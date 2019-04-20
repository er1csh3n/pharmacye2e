import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getPrescriptions} from "../actions/prescriptions.action";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class Prescriptions extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'purchase_date',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };
    }

    componentDidMount() {
        !this.props.prescriptions && this.props.getPrescriptions(); //if props.products does not exist then getProducts
        // console.log(this.props.prescriptions);
    }

    showStatus = (status) => {
        // console.log(status);
        return status.status;
    };

    showName = (cell) => {
        // console.log(cell);
        return cell.userDetail.name;
    };

    colFormatter = (cell) => {
        // console.log(cell);
        return (
            <Link to= {`/prescription/${cell}`}>
                {cell}
            </Link>
        );
    };

    render() {
        return (
            <div>
                <br/>
                <br/>
                {this.props.prescriptions && <div>
                    <BootstrapTable data={this.props.prescriptions} options={this.options} pagination keyboardNav>
                        <TableHeaderColumn width="10%"dataFormat = {this.colFormatter} key={this.props.prescriptions.id} dataField='id' isKeydataField='id' isKey dataSort filter={{type: 'TextFilter'}}>ID</TableHeaderColumn>
                        <TableHeaderColumn width="15%"dataField='user' dataFormat ={this.showName} filterFormatted dataSort filter={{type: 'TextFilter'}}>Customer Name</TableHeaderColumn>
                        <TableHeaderColumn width="15%"dataField='status' filterFormatted dataFormat={this.showStatus} dataSort filter={{ type: 'TextFilter'}}>Status</TableHeaderColumn>
                        <TableHeaderColumn width="20%"dataField='purchase_date' dataSort filter={{type: 'TextFilter'}}>Date</TableHeaderColumn>
                    </BootstrapTable>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {//determines what part of data from store that connected cocmponent needs
    // console.log(state.prescriptions);
    return {
        prescriptions: state.prescriptions
    }
};

export default connect(mapStateToProps, {getPrescriptions})(Prescriptions);

