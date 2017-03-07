import React, { Component } from 'react';

class Hello extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Edgar Flores P.'
        };
        /* I have to bind the method to use the instance of the class {this.setState} */ 
        this.despedirse = this.despedirse.bind(this);
    }

    despedirse() {
        this.setState({ name: 'Juan Carlos P.' });
    }

    render(){
        return (
            <h1 onClick={this.despedirse}>Hola {this.state.name}</h1>
        )
    }
}

module.exports = Hello;