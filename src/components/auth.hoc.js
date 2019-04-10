import React from 'react';
import {connect} from 'react-redux';

const auth = (OldComponent) => {

    class HocComponent extends React.Component {

        static getDerivedStateFromProps (props,state) {
            if (!props.loggedIn) {
                props.history.push('/login');
            }
            return state;
        }

        constructor(props) {
            super(props);
            this.state = {};
        }

        render() {
            return <OldComponent {...this.props}/>
        }

    }
    const mapStateToProps = state => {
        return {
            loggedIn: state.loggedIn
        };
    };
    return connect(mapStateToProps)(HocComponent);

};

export default auth;
