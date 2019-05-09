import React from "react";
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryZoomContainer} from 'victory';
import {connect} from "react-redux";
import {getProducts} from "../actions/products.action";
import {Card} from "react-bootstrap";
import '../Analytics.css';


class Analytics extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        !this.props.products && this.props.getProducts(); //not working for some reason
        console.log(this.props.products);
    }
    //
    // static getDerivedStateFromProps(props, state) {
    //     if (props.products) {
    //         return {
    //             products: props.products
    //         }
    //     }
    //     else {
    //         return null;
    //     }
    // }

    render() {
        return (
            <div>
                {this.props.products && <div className="analytics_position">
                    <Card style={{ width: '80%', margin: ' 0 20px 20px 0'}}>
                        <Card.Header>Top 5 Sold Drugs</Card.Header>
                        <div style={{ padding: '0 0 0 20px'}}>
                    <VictoryChart
                        domainPadding={{ x: -240 }}
                        containerComponent={
                            <VictoryZoomContainer/>
                        }>
                       <VictoryBar
                           barRatio={0.2}
                           // data={[
                           //     {"id":8,x:"Enbrel","brand":"Amgen","price":82.71,"stock":400,"category":"Etanercept",y:465},
                           //     {"id":11,x:"Eylea","brand":"Bayer","price":22.12,"stock":1400,"category":"Aflibercept",y:4444},
                           //     {"id":6,x:"Harvoni","brand":"Gilead Sciences","price":40.12,"stock":30000,"category":"Ledipasvir",y:10000},
                           //     {"id":1,x:"Viagra","brand":"Pfizer","price":16.12,"stock":1690,"category":"Sildenafil",y:410},
                           //     {"id":2,x:"Acetaminophen","brand":"Generic","price":0.57,"stock":99920,"category":"Acetaminophen",y:2080}
                           //     ]}
                           x="name"
                           y="sold"
                           data={this.props.products}
                           labels={(d) => d.y}
                           sortKey="sold"
                           sortOrder="descending"
                           alignment="start"
                       />
                    </VictoryChart>
                        </div>
                    </Card>
                    <Card style={{ width: '80%', margin: ' 0 20px 20px 0'}}>
                        <Card.Header>Least Sold Drugs</Card.Header>
                        <div style={{ padding: '0 0 0 20px'}}>
                            <VictoryChart
                                domainPadding={{ x: 20 }}
                                containerComponent={
                                    <VictoryZoomContainer/>
                                }>
                                <VictoryBar
                                    barRatio={0.2}
                                    data={[{"id":9,x:"Neulasta","brand":"Amgen","price":44.12,"stock":1521,"category":"Pegfilgrastim",y:12},
                                        {"id":7,x:"Lantus","brand":"Sanofi","price":30.99,"stock":15848,"category":"Insulin glargine",y:234},
                                        {"id":12,x:"Xaralto","brand":"Bayer","price":63.44,"stock":300,"category":"Rivaroxaban",y:10},
                                        {"id":4,x:"Humira","brand":"AbbVie","price":186.67,"stock":10000,"category":"Adalimumab",y:50},
                                        {"id":5,x:"Remicade","brand":"Johnson and Johnson","price":111.86,"stock":2000,"category":"Infliximab",y:10}]}
                                    labels={(d) => d.y}
                                    sortKey="y"
                                    sortOrder="ascending"
                                    alignment="start"
                                    theme={VictoryTheme.material}
                                />
                            </VictoryChart>
                        </div>
                    </Card>
                    <Card style={{ width: '80%', margin: ' 0 20px 20px 0'}}>
                        <Card.Header>Profit Margins</Card.Header>
                        <div style={{ padding: '0 0 0 20px'}}>
                            <VictoryChart
                                domainPadding={{ x: 20 }}
                                containerComponent={
                                    <VictoryZoomContainer/>
                                }>
                                <VictoryBar
                                    barRatio={0.2}
                                    data={this.props.products}
                                    labels={(d) => d.y}
                                    x={"name"}
                                    y={(d) => (d.stock * d.price) * 0.2}
                                    sortKey="y"
                                    sortOrder="ascending"
                                    alignment="start"
                                    theme={VictoryTheme.material}
                                />
                            </VictoryChart>
                        </div>
                    </Card>
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

export default connect(mapStateToProps, {getProducts})(Analytics);


// data={[{"id":9,x:"Neulasta","brand":"Amgen","price":44.12,"stock":1521,"category":"Pegfilgrastim",y:12},
// {"id":7,x:"Lantus","brand":"Sanofi","price":30.99,"stock":15848,"category":"Insulin glargine",y:234},
// {"id":8,x:"Enbrel","brand":"Amgen","price":82.71,"stock":400,"category":"Etanercept",y:465},
// {"id":10,x:"Epogen","brand":"Amgen","price":12.21,"stock":600,"category":"Epoetin alfa",y:321},
// {"id":11,x:"Eylea","brand":"Bayer","price":22.12,"stock":1400,"category":"Aflibercept",y:4444},
// {"id":12,x:"Xaralto","brand":"Bayer","price":63.44,"stock":300,"category":"Rivaroxaban",y:10},
// {"id":6,x:"Harvoni","brand":"Gilead Sciences","price":40.12,"stock":30000,"category":"Ledipasvir",y:10000},
// {"id":1,x:"Viagra","brand":"Pfizer","price":16.12,"stock":1690,"category":"Sildenafil",y:410},
// {"id":2,x:"Acetaminophen","brand":"Generic","price":0.57,"stock":99920,"category":"Acetaminophen",y:2080},
// {"id":3,x:"Synthroid","brand":"Abbott","price":24.99,"stock":9910,"category":"Levothyroxine",y:290},
// {"id":4,x:"Humira","brand":"AbbVie","price":186.67,"stock":10000,"category":"Adalimumab",y:50},
// {"id":5,x:"Remicade","brand":"Johnson and Johnson","price":111.86,"stock":2000,"category":"Infliximab",y:10}]}
