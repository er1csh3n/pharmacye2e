import React from "react";
import PickyDateTime from 'react-picky-date-time';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPickyDateTime: true
        };
    }
    render() {
        const {
            showPickyDateTime
        } = this.state;

        return(
            <div>
                <br/>
            <PickyDateTime
                size="s"
                mode={1}
                show={showPickyDateTime}
                locale="en-us"
                onClose={() => this.setState({ showPickyDateTime: false })}
            />
            </div>
        );
    }
}
export default Home;
