import React, { PropTypes } from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getProducts, deleteProduct} from "../actions/products.action";
import {BootstrapTable, DeleteButton, TableHeaderColumn} from "react-bootstrap-table";
import {Button} from "react-bootstrap";

class Products extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'id',  // default sort column name
            defaultSortOrder: 'asc', // default sort order
            deleteBtn: this.deleteButton
        };

        this.state = {
            selected: []
        }
    }

    static getDerivedStateFromProps (props) {
        !props.products && props.getProducts();
        return null;
    }

    componentDidMount() {
        !this.props.products && this.props.getProducts(); //if props.products does not exist then getProducts
        console.log(this.props.products);
    }

    colFormatter = (cell) => {
        return (
            <Link to= {`/edit-product/${cell}`}>
                {cell}
            </Link>
        );
    };

    // submit = (event) => {
    //     event.preventDefault();
    //     this.props.deleteProduct(this.state.product,
    //         res => {
    //             console.log('deleted successfully', res);
    //             this.setState({
    //                 msg: 'deleted item from inventory successfully'
    //         });
    //         },
    //         err => {
    //             console.log('delete failed', err);
    //             this.setState({
    //                 msg: 'could not delete item'
    //             });
    //         });
    // };

    handleDeleteButtonClick = (onClick) => {
        // Custom your onClick event here
        this.props.deleteProduct(this.state.selected);
        onClick();
    };

    deleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText='Delete Selected Row(s)'
                btnContextual='btn-danger'
                btnGlyphicon='glyphicon-edit'
                onClick={ () => this.handleDeleteButtonClick(onClick) }/>
        );
    };

    onRowSelect = (row, isSelected) => {
        console.log(row);
        console.log(this.state);
        if(isSelected) {
            this.state.selected.push(row.id);
        } else {
            this.state.selected.splice(this.state.selected.indexOf(row.id), 1);
        }
        console.log(this.state.selected);
        return true;
    };

    onSelectAll = (isSelected, rows) => {
        if(isSelected) {
            rows.forEach((row) => {this.state.selected.push(row.id)});
        } else {
            rows.forEach(() => {this.state.selected.pop()});
        }
        console.log(this.state.selected);
    };

    render() {
        const selectRow = {
            mode: 'checkbox',
            bgColor: 'yellow',
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll
        };
            return (
                <container>
                    <br/>
                    <br/>
                {this.props.products && <div>
                    <BootstrapTable data={this.props.products} selectRow = {selectRow} options={this.options} condensed hover pagination keyBoardNav deleteRow>
                        <TableHeaderColumn width="10%" key={this.props.products.id} dataField='id' isKey dataSort
                                           filter={{type: 'TextFilter'}} dataFormat = {this.colFormatter} dataAlign='center'>ID</TableHeaderColumn>

                        <TableHeaderColumn dataField='category' dataSort
                                           filter={{type: 'TextFilter'}} dataAlign='center' >Category</TableHeaderColumn>

                        <TableHeaderColumn dataField='name' dataSort
                                           filter={{type: 'TextFilter'}} dataAlign='center' >Name</TableHeaderColumn>

                        <TableHeaderColumn dataField='brand' dataSort
                                           filter={{type: 'TextFilter'}} dataAlign='center' >Brand</TableHeaderColumn>

                        <TableHeaderColumn dataField='price' dataSort
                                           filter={{
                                               type: 'NumberFilter',
                                               numberComparators: [ '=', '>', '<=', '>=', '<' ]
                                           }} dataAlign='center'>Price($)</TableHeaderColumn>

                        <TableHeaderColumn  dataField='stock' dataSort
                                            filter={{
                                                type: 'NumberFilter',
                                                numberComparators: [ '=', '>', '<=', '>=', '<' ]
                                            }} dataAlign='center' >Stock</TableHeaderColumn>
                        <TableHeaderColumn  dataField='sold' dataSort
                                            filter={{
                                                type: 'NumberFilter',
                                                numberComparators: [ '=', '>', '<=', '>=', '<' ]
                                            }} dataAlign='center' >Sold</TableHeaderColumn>
                    </BootstrapTable>
                </div>}
                </container>
            )
        }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

export default connect(mapStateToProps, {getProducts,deleteProduct})(Products);

