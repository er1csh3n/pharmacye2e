import React from "react";
import {VictoryPie} from 'victory';
import {connect} from "react-redux";
import {getProducts} from "../actions/products.action";


class Analytics extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
    }

    componentDidMount() {
        !this.props.products && this.props.getProducts(); //not working for some reason
        console.log(this.props.products);
    }

    render() {
        return (
            <div>
                {this.props.products && <div>
                <VictoryPie/>
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

export default connect(mapStateToProps, getProducts)(Analytics);
