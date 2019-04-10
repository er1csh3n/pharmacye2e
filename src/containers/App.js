import React, { Component } from 'react';
import Header from "../components/Header";

class App extends Component {

    render() {
        return (
            <>
                <Header/>
                    <main className="container-fluid">
                        {this.props.children}
                    </main>
            </>
        )
    };
}

export default App;
