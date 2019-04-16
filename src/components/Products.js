import React, { PropTypes } from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getProducts} from "../actions/products.action";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table"
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


class Products extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };
    }

    componentDidMount() {
        !this.props.products && this.props.getProducts(); //if props.products does not exist then getProducts
        console.log(this.props.products);
    }

/*    render(){
        return (
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.products && this.props.products.map(p=>{
                        return (
                            <tr key = {p.id}>
                                <td><Link to = {`/edit-product/${p.id}`}>{p.id}</Link></td>
                                <td>{p.category}</td>
                                <td>{p.name}</td>
                                <td>{p.brand}</td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }*/

    colFormatter = (cell) => {
        console.log(cell);
        return (
            <Link to= {`/edit-product/${cell}`}>
                {cell}
            </Link>
        );
    };

    render() {

            return (
                <div>
                {this.props.products && <div>
                    <BootstrapTable data={this.props.products} options={this.options}>
                        <TableHeaderColumn key={this.props.products.id} dataField='id' isKey dataSort
                                           filter={{type: 'TextFilter', delay: 100}} dataFormat = {this.colFormatter}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='category' dataSort
                                           filter={{type: 'TextFilter', delay: 100}}>Category</TableHeaderColumn>
                        <TableHeaderColumn dataField='name' dataSort
                                           filter={{type: 'TextFilter', delay: 100}}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='brand' dataSort
                                           filter={{type: 'TextFilter', delay: 100}}>Brand</TableHeaderColumn>
                        <TableHeaderColumn dataField='price' dataSort
                                           filter={{type: 'TextFilter', delay: 100}}>Price</TableHeaderColumn>
                        <TableHeaderColumn dataField='stock' dataSort
                                           filter={{type: 'TextFilter', delay: 100}}>Stock</TableHeaderColumn>
                    </BootstrapTable>
                </div>}
                </div>
            )
        }
}

const mapStateToProps = (state) => { //determines what part of data from store that connected cocmponent needs
    return {
        products: state.products
    }
};

export default connect(mapStateToProps, {getProducts})(Products);

